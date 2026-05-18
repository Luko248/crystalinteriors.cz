import type { APIRoute } from "astro";
import { consumeMagicLinkToken, issueSessionCookie, SESSION_COOKIE } from "@/lib/auth";

export const prerender = false;

const redirectTo = (location: string, headers: Headers = new Headers()): Response => {
  headers.set("Location", location);
  return new Response(null, { status: 302, headers });
};

export const GET: APIRoute = async ({ url, locals, cookies }) => {
  const token = url.searchParams.get("token");
  if (!token) return redirectTo("/admin/login/?error=missing-token");

  const result = await consumeMagicLinkToken(locals, token);
  if (!result.ok) {
    return redirectTo(`/admin/login/?error=${encodeURIComponent(result.reason)}`);
  }

  const { value, options } = await issueSessionCookie(locals, result.email);
  cookies.set(SESSION_COOKIE, value, options);
  return redirectTo("/admin/");
};
