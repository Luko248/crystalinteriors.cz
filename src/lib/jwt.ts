/**
 * HS256 JWT sign/verify built on the Web Crypto API.
 *
 * Runs unchanged in Cloudflare Workers, Node 18+, and modern browsers — we
 * never reach for Node's `crypto` module so the same bundle works for SSR
 * routes on Cloudflare Pages and for local `astro dev`.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const base64UrlEncode = (input: Uint8Array | string): string => {
  const bytes =
    typeof input === "string" ? encoder.encode(input) : input;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const base64UrlDecode = (input: string): Uint8Array => {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? 0 : 4 - (padded.length % 4);
  const binary = atob(padded + "=".repeat(pad));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const importKey = async (secret: string): Promise<CryptoKey> =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

const constantTimeEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
};

export interface JwtPayload {
  /** What this token is for — guards against cross-use (magic-link vs session). */
  purpose: "magic-link" | "session";
  /** Email of the authenticated user (always the allowlisted admin). */
  email: string;
  /** Issued-at, unix seconds. */
  iat: number;
  /** Expiry, unix seconds. */
  exp: number;
}

export interface SignOptions {
  /** Lifetime of the token, in seconds. */
  ttlSeconds: number;
}

export const signJwt = async (
  payload: Omit<JwtPayload, "iat" | "exp">,
  secret: string,
  { ttlSeconds }: SignOptions,
): Promise<string> => {
  const now = Math.floor(Date.now() / 1000);
  const body: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + ttlSeconds,
  };
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const claims = base64UrlEncode(JSON.stringify(body));
  const signingInput = `${header}.${claims}`;
  const key = await importKey(secret);
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(signingInput)),
  );
  return `${signingInput}.${base64UrlEncode(signature)}`;
};

export type VerifyResult =
  | { ok: true; payload: JwtPayload }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" | "wrong-purpose" };

export const verifyJwt = async (
  token: string,
  secret: string,
  expectedPurpose: JwtPayload["purpose"],
): Promise<VerifyResult> => {
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "malformed" };
  const [headerB64, claimsB64, signatureB64] = parts;

  let payload: JwtPayload;
  try {
    payload = JSON.parse(decoder.decode(base64UrlDecode(claimsB64))) as JwtPayload;
  } catch {
    return { ok: false, reason: "malformed" };
  }

  const key = await importKey(secret);
  const signatureBytes = base64UrlDecode(signatureB64);
  const expectedSig = new Uint8Array(
    await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(`${headerB64}.${claimsB64}`),
    ),
  );
  if (!constantTimeEqual(signatureBytes, expectedSig)) {
    return { ok: false, reason: "bad-signature" };
  }

  const now = Math.floor(Date.now() / 1000);
  if (typeof payload.exp !== "number" || now >= payload.exp) {
    return { ok: false, reason: "expired" };
  }
  if (payload.purpose !== expectedPurpose) {
    return { ok: false, reason: "wrong-purpose" };
  }
  return { ok: true, payload };
};
