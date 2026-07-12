import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { copyFileSync } from "node:fs";

export default defineConfig({
  // Project site: served from https://<user>.github.io/meridian/, so every asset
  // URL needs the repo name prefixed. Change this if the repo is renamed.
  base: "/meridian/",
  plugins: [
    react(),
    tailwindcss(),
    {
      // GitHub Pages can't rewrite unknown paths to index.html, so a deep link
      // like /meridian/stays would 404 on refresh or when shared. Pages *does*
      // serve 404.html for anything it can't find — making it a copy of the app
      // shell lets the router take over and render the right route.
      name: "spa-404-fallback",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { port: 5173, open: true },
});
