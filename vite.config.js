import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Use relative paths for static hosting like GitHub Pages or custom servers
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Shortcut for cleaner imports like '@/components/Navbar'
    },
  },

  server: {
    port: 3000,
    open: true, // auto-open in browser
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',  // This should be for bundled assets, not static files
    sourcemap: false, // disable source maps in production unless debugging
    emptyOutDir: true, // clean output dir before build
  },
});
