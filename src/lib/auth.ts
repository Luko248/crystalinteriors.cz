/**
 * Session helpers built on the JWT lib.
 *
 * Auth flow:
 *  1. POST /api/auth/request-link  → sends a 10-min magic-link JWT to ADMIN_EMAIL
 *  2. GET  /api/auth/verify?token  → swaps the magic-link JWT for a 7-day session
 *                                    cookie (HTTP-only, Secure, SameSite=Lax)
 *  3. POST /api/auth/logout        → clears the cookie
 *
 * Magic-link tokens are stateless (no KV needed): we trust the JWT signature
 * + the `exp` claim. A leaked token is only usable for ≤10 minutes and can
 * only authenticate the allowlisted email — acceptable for a single-admin site.
 */

import type { APIContext, AstroGlobal } from "astro";
import { signJwt, verifyJwt } from "./jwt";
import { readEnv, requireEnv } from "./env";

export const SESSION_COOKIE = "ci_session";
export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days
export const MAGIC_LINK_TTL_SECONDS = 10 * 60; // 10 minutes

type LocalsLike = APIContext["locals"] | AstroGlobal["locals"];

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const getAdminEmail = async (locals: LocalsLike): Promise<string> =>
  normalizeEmail(await requireEnv(locals, "ADMIN_EMAIL"));

export const isAllowedEmail = async (
  locals: LocalsLike,
  email: string,
): Promise<boolean> => {
  const allowed = await readEnv(locals, "ADMIN_EMAIL");
  if (!allowed) return false;
  return normalizeEmail(email) === normalizeEmail(allowed);
};

export const issueMagicLinkToken = async (
  locals: LocalsLike,
  email: string,
): Promise<string> => {
  const secret = await requireEnv(locals, "SESSION_SECRET");
  return signJwt({ purpose: "magic-link", email: normalizeEmail(email) }, secret, {
    ttlSeconds: MAGIC_LINK_TTL_SECONDS,
  });
};

export const consumeMagicLinkToken = async (
  locals: LocalsLike,
  token: string,
): Promise<{ ok: true; email: string } | { ok: false; reason: string }> => {
  const secret = await readEnv(locals, "SESSION_SECRET");
  if (!secret) return { ok: false, reason: "server-misconfigured" };
  const result = await verifyJwt(token, secret, "magic-link");
  if (!result.ok) return { ok: false, reason: result.reason };
  if (!(await isAllowedEmail(locals, result.payload.email))) {
    return { ok: false, reason: "email-not-allowed" };
  }
  return { ok: true, email: result.payload.email };
};

export const issueSessionCookie = async (
  locals: LocalsLike,
  email: string,
): Promise<{ value: string; options: { httpOnly: true; secure: boolean; sameSite: "lax"; path: string; maxAge: number } }> => {
  const secret = await requireEnv(locals, "SESSION_SECRET");
  const value = await signJwt({ purpose: "session", email: normalizeEmail(email) }, secret, {
    ttlSeconds: SESSION_TTL_SECONDS,
  });
  return {
    value,
    options: {
      httpOnly: true,
      // Cookies must be cookied as Secure on Cloudflare Pages. We disable
      // Secure in `astro dev` (where the host is plain http://localhost).
      secure: import.meta.env.PROD,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    },
  };
};

export const readSession = async (
  context: Pick<APIContext, "locals" | "cookies">,
): Promise<{ email: string } | null> => {
  const cookie = context.cookies.get(SESSION_COOKIE);
  if (!cookie?.value) return null;
  const secret = await readEnv(context.locals, "SESSION_SECRET");
  if (!secret) return null;
  const result = await verifyJwt(cookie.value, secret, "session");
  if (!result.ok) return null;
  if (!(await isAllowedEmail(context.locals, result.payload.email))) return null;
  return { email: result.payload.email };
};

/** Redirect to /admin/login if the request does not have a valid session. */
export const requireSession = async (
  context: APIContext,
): Promise<Response | { email: string }> => {
  const session = await readSession(context);
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login/" },
    });
  }
  return session;
};
