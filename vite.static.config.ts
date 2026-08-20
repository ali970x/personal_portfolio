import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const staticRoot = path.resolve(projectRoot, "static-site");

export default defineConfig({
  root: staticRoot,
  publicDir: path.resolve(projectRoot, "public"),
  plugins: [react()],
  resolve: {
    alias: { "@": projectRoot },
  },
  build: {
    outDir: path.resolve(projectRoot, "static-dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(staticRoot, "index.html"),
        admin: path.resolve(staticRoot, "admin/index.html"),
      },
    },
  },
});
