import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.join(process.cwd(), "client/src"),
    },
  },
  root: "client",
  build: {
    outDir: "dist",
  },
  base: '/',
});
