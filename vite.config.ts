import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { copyFileSync, mkdirSync } from "node:fs";

export default defineConfig({
  // Served from the root of the client's own domain (Vercel or GitHub Pages with
  // a custom domain), so assets resolve from "/".
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    {
      // Give every route a real file so it is served with HTTP 200 on any static
      // host. GitHub Pages can't rewrite paths to index.html, and serving /about
      // through 404.html would tell Google and link-preview bots it doesn't exist.
      // 404.html stays as the shell for genuinely unknown paths.
      name: "static-routes",
      closeBundle() {
        for (const route of ["about", "contact"]) {
          mkdirSync(`dist/${route}`, { recursive: true });
          copyFileSync("dist/index.html", `dist/${route}/index.html`);
        }
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { port: 5173 },
});
