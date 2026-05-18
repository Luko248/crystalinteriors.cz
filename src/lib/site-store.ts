/**
 * Read/write the editable parts of the site (gallery sections + pricelist)
 * to a single raw JSON resource in Cloudinary.
 *
 * Why Cloudinary instead of a database?
 * - The site already stores all images in Cloudinary; this avoids adding a
 *   second backend store just for ~1 KB of structured copy.
 * - Cloudinary "raw" resources are versioned and CDN-served, so the public
 *   site can fetch the latest config straight from the CDN.
 *
 * Default content is bundled in `src/data/site.ts` — when the JSON
 * resource doesn't exist yet (fresh install), we serve those defaults so
 * the public site never blanks out.
 */

import type { APIContext, AstroGlobal } from "astro";
import { site } from "@/data/site";
import { readEnv, requireEnv } from "./env";

type LocalsLike = APIContext["locals"] | AstroGlobal["locals"];

export interface ReferenceSection {
  slug: string;
  tag: string;
  title: string;
  text: string;
}

export interface PricingItem {
  title: string;
  price: string;
}

export interface SiteData {
  references: ReferenceSection[];
  pricing: PricingItem[];
  updatedAt: string;
}

const RAW_PUBLIC_ID = "crystal-interiors/site";

const defaults = (): SiteData => ({
  references: site.references.map((r) => ({
    slug: r.slug,
    tag: r.tag,
    title: r.title,
    text: r.text,
  })),
  pricing: site.pricing.map((p) => ({ title: p.title, price: p.price })),
  updatedAt: new Date(0).toISOString(),
});

/** Public read: fetch from Cloudinary's CDN with no auth needed. */
export const readSiteData = async (
  locals: LocalsLike,
): Promise<SiteData> => {
  const cloudName = await readEnv(locals, "PUBLIC_CLOUDINARY_CLOUD_NAME");
  if (!cloudName) return defaults();

  const url = `https://res.cloudinary.com/${cloudName}/raw/upload/${RAW_PUBLIC_ID}.json`;
  try {
    const response = await fetch(url, { cf: { cacheTtl: 30 } } as RequestInit);
    if (!response.ok) return defaults();
    const data = (await response.json()) as Partial<SiteData>;
    return {
      references: Array.isArray(data.references) ? data.references : defaults().references,
      pricing: Array.isArray(data.pricing) ? data.pricing : defaults().pricing,
      updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : new Date(0).toISOString(),
    };
  } catch {
    return defaults();
  }
};

const sha1Hex = async (input: string): Promise<string> => {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  const arr = new Uint8Array(digest);
  let out = "";
  for (const b of arr) out += b.toString(16).padStart(2, "0");
  return out;
};

/**
 * Admin write: uploads the JSON as a raw resource with overwrite.
 * Signature uses the same shape Cloudinary expects for signed uploads.
 */
export const writeSiteData = async (
  locals: LocalsLike,
  data: SiteData,
): Promise<void> => {
  const cloudName = await requireEnv(locals, "PUBLIC_CLOUDINARY_CLOUD_NAME");
  const apiKey = await requireEnv(locals, "CLOUDINARY_API_KEY");
  const apiSecret = await requireEnv(locals, "CLOUDINARY_API_SECRET");

  const timestamp = Math.floor(Date.now() / 1000);

  // Params to sign (sorted alphabetically, joined as key=value).
  const params: Record<string, string | number | boolean> = {
    invalidate: true,
    overwrite: true,
    public_id: RAW_PUBLIC_ID,
    resource_type: "raw",
    timestamp,
    type: "upload",
  };
  const signingString = Object.keys(params)
    .filter((k) => k !== "resource_type") // resource_type goes in URL, not signature
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const signature = await sha1Hex(`${signingString}${apiSecret}`);

  const payload = JSON.stringify(data, null, 2);
  const form = new FormData();
  form.set("file", new Blob([payload], { type: "application/json" }), `${RAW_PUBLIC_ID}.json`);
  form.set("api_key", apiKey);
  form.set("timestamp", String(timestamp));
  form.set("public_id", RAW_PUBLIC_ID);
  form.set("overwrite", "true");
  form.set("invalidate", "true");
  form.set("type", "upload");
  form.set("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
    { method: "POST", body: form },
  );
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Cloudinary upload ${response.status}: ${detail.slice(0, 200)}`);
  }
};
