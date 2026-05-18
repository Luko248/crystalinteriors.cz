/**
 * Unified env reader for Astro 6 + Cloudflare adapter.
 *
 * Astro 6 removed `Astro.locals.runtime.env`. Cloudflare bindings now come
 * from the `cloudflare:workers` virtual module, which the adapter provides
 * in dev too. For pure static / non-adapter contexts the import will not
 * resolve, so we lazy-import and fall back to `import.meta.env`.
 *
 * The first argument (`locals`) is preserved for call-site symmetry, but
 * the runtime env is now sourced module-globally — keep it for future flex.
 */

import type { APIContext, AstroGlobal } from "astro";

type LocalsLike = APIContext["locals"] | AstroGlobal["locals"];

type EnvSource = Partial<Record<keyof Env, string>>;

let cachedRuntimeEnv: EnvSource | null = null;
let runtimeEnvLoaded = false;

const loadRuntimeEnv = async (): Promise<EnvSource | null> => {
  if (runtimeEnvLoaded) return cachedRuntimeEnv;
  runtimeEnvLoaded = true;
  try {
    // Resolved by @astrojs/cloudflare at runtime; in static builds the
    // bundler tree-shakes this branch away.
    const mod = await import(/* @vite-ignore */ "cloudflare:workers");
    cachedRuntimeEnv = (mod as { env?: EnvSource })?.env ?? null;
  } catch {
    cachedRuntimeEnv = null;
  }
  return cachedRuntimeEnv;
};

const fromBuildtime = (key: keyof Env): string | undefined => {
  const value = (import.meta.env as Record<string, unknown>)[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
};

export const readEnv = async (
  _locals: LocalsLike | undefined,
  key: keyof Env,
): Promise<string | undefined> => {
  const runtime = await loadRuntimeEnv();
  const fromRuntime = runtime?.[key];
  if (typeof fromRuntime === "string" && fromRuntime.length > 0) {
    return fromRuntime;
  }
  return fromBuildtime(key);
};

export const requireEnv = async (
  locals: LocalsLike | undefined,
  key: keyof Env,
): Promise<string> => {
  const value = await readEnv(locals, key);
  if (!value) {
    throw new Error(
      `Missing required env var ${String(key)}. Set it in .env (local) or Cloudflare Pages settings.`,
    );
  }
  return value;
};
