import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
    // Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    
    // Brotli compression (better than gzip, ~15-20% smaller)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  
  base: "/",
  
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
    
    // Aggressive minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    
    rollupOptions: {
      output: {
        // Better chunking strategy
        manualChunks: (id) => {
          // Core React - loaded first
          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('node_modules/react/')) return 'react';
          
          // Framer Motion - heavy, load separately
          if (id.includes('framer-motion')) return 'motion';
          
          // Icons - load on demand
          if (id.includes('lucide-react')) return 'icons';
          
          // UI utilities
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'ui-utils';
          }
          
          // Radix UI components
          if (id.includes('@radix-ui')) return 'radix';
          
          // Date utilities
          if (id.includes('date-fns')) return 'date-utils';
        },
        
        // Optimize asset names for caching
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext || '')) {
            return 'images/[name]-[hash][extname]';
          }
          if (/woff2?|eot|ttf|otf/i.test(ext || '')) {
            return 'fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    
    // Smaller chunk warning
    chunkSizeWarningLimit: 300,
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Target modern browsers only
    target: 'es2020',
  },
  
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['@vite/client', '@vite/env'],
  },
  
  server: {
    port: 3000,
    open: true,
  },
  
  // Preview server for testing production build
  preview: {
    port: 4173,
    open: true,
  },
  
  // Enable esbuild for faster transforms
  esbuild: {
    legalComments: 'none',
  },
});