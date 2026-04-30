import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://www.crystalinteriors.cz",
  base: "/",
  output: "static",
  devToolbar: {
    enabled: false,
  },
  trailingSlash: "always",
});
