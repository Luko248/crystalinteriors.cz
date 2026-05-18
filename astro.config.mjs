import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

const site = process.env.PUBLIC_SITE_URL || "https://www.crystalinteriors.cz";
const base = process.env.PUBLIC_BASE_PATH || "/";

// Astro 6 only ships `output: "static"`; routes opt into SSR via
// `export const prerender = false`. The Cloudflare adapter makes those
// dynamic routes runnable as Pages Functions. Set DEPLOY_TARGET=static
// (legacy GitHub Pages CI) to skip the adapter and produce a pure static
// build with no SSR endpoints.
const staticOnly = process.env.DEPLOY_TARGET === "static";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: "static",
  adapter: staticOnly ? undefined : cloudflare(),
  devToolbar: {
    enabled: false,
  },
  trailingSlash: "always",
});
