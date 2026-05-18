/// <reference types="astro/client" />
/// <reference types="@types/google.maps" />
/// <reference types="@cloudflare/workers-types" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

interface Env {
  // Server-only secrets
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
  ADMIN_EMAIL?: string;
  SESSION_SECRET?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;

  // Public (also available client-side under import.meta.env.PUBLIC_*)
  PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
  PUBLIC_SITE_URL?: string;
}

declare namespace App {
  interface Locals extends Runtime {
    session?: {
      email: string;
      issuedAt: number;
      expiresAt: number;
    };
  }
}

interface ImportMetaEnv extends Env {}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
