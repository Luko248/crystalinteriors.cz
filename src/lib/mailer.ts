/**
 * Email sender for magic-link tokens.
 *
 * If RESEND_API_KEY is configured, sends via Resend's REST API.
 * Otherwise (dev mode, key not yet set) prints the link to the server console
 * so the developer can still complete the auth flow locally.
 *
 * Resend SDK is intentionally NOT imported here — we call the REST API
 * directly so the bundle stays light and compatible with Cloudflare Workers.
 */

import type { APIContext, AstroGlobal } from "astro";
import { readEnv } from "./env";

type LocalsLike = APIContext["locals"] | AstroGlobal["locals"];

const DEFAULT_FROM = "Crystal Interiors <onboarding@resend.dev>";

const renderHtml = (link: string): string => `
  <!doctype html>
  <html lang="cs">
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#16140f; color:#e9e4dc; padding:40px 16px;">
      <div style="max-width:480px;margin:0 auto;background:#1f1c17;padding:32px;border-radius:16px;">
        <h1 style="font-size:20px;margin:0 0 12px;color:#fff;">Přihlášení do administrace</h1>
        <p style="line-height:1.6;margin:0 0 20px;color:#cfc8bd;">
          Klikněte na tlačítko níže pro přihlášení. Odkaz vyprší za 10 minut.
        </p>
        <p style="margin:0 0 24px;">
          <a href="${link}" style="display:inline-block;padding:12px 24px;background:#8b6a4d;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Přihlásit se</a>
        </p>
        <p style="font-size:12px;color:#8a8377;line-height:1.6;margin:0;">
          Pokud jste přihlášení nevyžádali, tento e-mail ignorujte.
        </p>
      </div>
    </body>
  </html>
`;

const renderText = (link: string): string =>
  `Crystal Interiors — přihlášení do administrace\n\nKlikněte na odkaz pro přihlášení (platí 10 minut):\n${link}\n\nPokud jste si přihlášení nevyžádali, ignorujte tento e-mail.`;

export const sendMagicLinkEmail = async (
  locals: LocalsLike,
  to: string,
  link: string,
): Promise<{ delivered: boolean; mode: "resend" | "console" }> => {
  const apiKey = await readEnv(locals, "RESEND_API_KEY");
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.log(
      `\n[mailer] RESEND_API_KEY not set — magic link for ${to}:\n  ${link}\n`,
    );
    return { delivered: false, mode: "console" };
  }

  const from = (await readEnv(locals, "RESEND_FROM")) ?? DEFAULT_FROM;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Přihlášení do Crystal Interiors administrace",
      html: renderHtml(link),
      text: renderText(link),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend API ${response.status}: ${detail.slice(0, 200)}`);
  }
  return { delivered: true, mode: "resend" };
};
