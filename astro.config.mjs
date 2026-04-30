import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL || "https://www.crystalinteriors.cz";
const base = process.env.PUBLIC_BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: "static",
  devToolbar: {
    enabled: false,
  },
  trailingSlash: "always",
});
