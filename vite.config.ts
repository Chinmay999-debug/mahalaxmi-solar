// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build (`npm run build:pages`): a fully static, prerendered site served from
// https://chinmay999-debug.github.io/mahalaxmi-solar/. Lovable builds and dev are unaffected.
const githubPages = process.env["GITHUB_PAGES"] === "true";
const PAGES_BASE = "/mahalaxmi-solar/";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(githubPages && {
      // No server on GitHub Pages: render the page to static HTML at build time.
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
      pages: [{ path: "/" }],
    }),
  },
  ...(githubPages && {
    nitro: false as const,
    // Assets and the router basepath both follow Vite's base.
    vite: { base: PAGES_BASE },
  }),
});
