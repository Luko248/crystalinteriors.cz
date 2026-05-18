import type { APIRoute } from "astro";
import { readSession } from "@/lib/auth";
import { readSiteData, writeSiteData, type SiteData } from "@/lib/site-store";

export const prerender = false;

const json = (body: unknown, status = 200, headers?: Record<string, string>): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

export const GET: APIRoute = async ({ locals }) => {
  const data = await readSiteData(locals);
  return json(data, 200, {
    // Public read — short TTL is fine because Cloudinary raw URL is cached
    // by the browser/CDN anyway.
    "Cache-Control": "public, max-age=30, stale-while-revalidate=60",
  });
};

const sanitizeSlug = (raw: string): string =>
  raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isValidSection = (
  value: unknown,
): value is { slug: string; tag: string; title: string; text: string } => {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.slug === "string" &&
    v.slug.length > 0 &&
    typeof v.tag === "string" &&
    v.tag.length > 0 &&
    typeof v.title === "string" &&
    typeof v.text === "string"
  );
};

const isValidPricing = (
  value: unknown,
): value is { title: string; price: string } => {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.title === "string" && typeof v.price === "string";
};

export const POST: APIRoute = async (context) => {
  const session = await readSession(context);
  if (!session) return json({ error: "Unauthorized" }, 401);

  let body: Partial<SiteData>;
  try {
    body = (await context.request.json()) as Partial<SiteData>;
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // Partial update — only overwrite arrays that the client actually sent.
  // This lets the pricelist editor save without nuking references, and
  // vice versa.
  const current = await readSiteData(context.locals);

  const references = Array.isArray(body.references)
    ? body.references
        .filter(isValidSection)
        .map((s) => ({ ...s, slug: sanitizeSlug(s.slug) }))
        .filter((s) => s.slug.length > 0)
    : current.references;

  const pricing = Array.isArray(body.pricing)
    ? body.pricing.filter(isValidPricing)
    : current.pricing;

  const data: SiteData = {
    references,
    pricing,
    updatedAt: new Date().toISOString(),
  };

  try {
    await writeSiteData(context.locals, data);
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Save failed" },
      500,
    );
  }
  return json({ ok: true, data });
};
