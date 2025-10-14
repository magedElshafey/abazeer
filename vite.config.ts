import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";
import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: {
        plugins: [{ removeViewBox: false }],
      },
    }),

    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],

  build: {
    target: "esnext",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "terser",
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.info", "console.debug"],
        passes: 2,
        dead_code: true,
      },
      format: {
        comments: false,
      },
    },

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios", "@tanstack/react-query"],
          ui: ["lucide-react", "sonner"],
        },
        inlineDynamicImports: false,
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    reportCompressedSize: true,
  },

  server: {
    port: 3000,
  },

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
