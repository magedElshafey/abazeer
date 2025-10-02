import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      threshold: 10240,
      ext: ".gz",
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("lodash")) return "lodash";
            if (id.includes("react-icons")) return "icons";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("react-toastify")) return "toastify";
            if (id.includes("i18next")) return "i18n";
            return "vendor";
          }
        },
      },
      treeshake: true,
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
