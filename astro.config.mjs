import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],
  prefetch: {
    prefetchAll: true
  },
  site: "https://party-safari.westra.tech",
  output: "server",
  adapter: cloudflare()
});