// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Explicitly enable the Nitro deploy plugin targeting a Node server, so
  // `vite build` emits a runnable standalone server at .output/server/index.mjs
  // (run with PM2). Without this, outside a Lovable sandbox the wrapper skips
  // Nitro, and its sandbox default targets Cloudflare — neither is runnable on
  // our Node/PM2 + Nginx server.
  nitro: { preset: "node-server" },

  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    // Frontend is served under /gold-emi-app (Nginx routes that prefix to the
    // Nitro server). Vite generates asset URLs under this base; the TanStack
    // Router basepath in src/router.tsx must match.
    base: "/gold-emi-app/",
    server: {
      // 5173 so the frontend dev server doesn't collide with the backend on 8080.
      port: 5173,
      strictPort: false,
      hmr: {
        port: 5173,
      },
    },
  },
});
