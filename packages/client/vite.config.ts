import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },
  build: {
    target: "es2022",
    minify: true,
    sourcemap: true,
  },
});
