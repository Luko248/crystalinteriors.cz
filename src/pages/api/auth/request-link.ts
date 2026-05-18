import type { APIRoute } from "astro";
import { isAllowedEmail, issueMagicLinkToken } from "@/lib/auth";
import { sendMagicLinkEmail } from "@/lib/mailer";
import { readEnv } from "@/lib/env";

export const prerender = false;

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request, locals, url }) => {
  let email: string;
  try {
    const body = (await request.json()) as { email?: string };
    email = (body.email ?? "").toString().trim();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (!email) return json({ error: "Email is required" }, 400);

  // Always respond with success regardless of whether the email is allowed —
  // this prevents enumeration. The actual mail is only sent for the allowed
  // address.
  if (!(await isAllowedEmail(locals, email))) {
    return json({ ok: true });
  }

  try {
    const token = await issueMagicLinkToken(locals, email);
    const publicUrl = (await readEnv(locals, "PUBLIC_SITE_URL")) ?? url.origin;
    const link = `${publicUrl.replace(/\/$/, "")}/api/auth/verify/?token=${encodeURIComponent(token)}`;
    const result = await sendMagicLinkEmail(locals, email, link);
    return json({ ok: true, delivered: result.delivered });
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Failed to send link" },
      500,
    );
  }
};
