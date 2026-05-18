/**
 * Cloudinary admin helpers — signed-upload signature generation.
 *
 * Signature must be computed server-side because it depends on
 * CLOUDINARY_API_SECRET. The browser sends file + signature + timestamp +
 * folder + api_key to https://api.cloudinary.com/v1_1/{cloud}/image/upload.
 *
 * Web Crypto only (works on Cloudflare Workers).
 */

import type { APIContext, AstroGlobal } from "astro";
import { readEnv, requireEnv } from "./env";

type LocalsLike = APIContext["locals"] | AstroGlobal["locals"];

const encoder = new TextEncoder();

const toHex = (bytes: ArrayBuffer): string => {
  const arr = new Uint8Array(bytes);
  let out = "";
  for (const byte of arr) out += byte.toString(16).padStart(2, "0");
  return out;
};

const sha1 = async (input: string): Promise<string> =>
  toHex(await crypto.subtle.digest("SHA-1", encoder.encode(input)));

export interface SignedUpload {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  uploadPreset?: string;
  tags?: string;
}

export const buildUploadSignature = async (
  locals: LocalsLike,
  options: { folder: string; tags?: string[]; uploadPreset?: string },
): Promise<SignedUpload> => {
  const cloudName = await requireEnv(locals, "PUBLIC_CLOUDINARY_CLOUD_NAME");
  const apiKey = await requireEnv(locals, "CLOUDINARY_API_KEY");
  const apiSecret = await requireEnv(locals, "CLOUDINARY_API_SECRET");

  const timestamp = Math.floor(Date.now() / 1000);
  const tags = options.tags?.length ? options.tags.join(",") : undefined;

  // Params to sign, alphabetically sorted, joined as key=value&...
  const params: Record<string, string | number> = {
    folder: options.folder,
    timestamp,
  };
  if (tags) params.tags = tags;
  if (options.uploadPreset) params.upload_preset = options.uploadPreset;

  const signingString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const signature = await sha1(`${signingString}${apiSecret}`);

  return {
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: options.folder,
    uploadPreset: options.uploadPreset,
    tags,
  };
};

export const getCloudName = (locals: LocalsLike): Promise<string | undefined> =>
  readEnv(locals, "PUBLIC_CLOUDINARY_CLOUD_NAME");
