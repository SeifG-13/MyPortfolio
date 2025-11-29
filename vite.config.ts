import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // ⚠️ Change "portfolio" to your GitHub repo name
  base: "/MyPortfolio/",
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  
  build: {
    outDir: "dist",
    minify: "terser",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          motion: ["framer-motion"],
          ui: ["lucide-react", "clsx", "tailwind-merge"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  
  server: {
    port: 3000,
    open: true,
  },
});
