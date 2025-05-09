import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
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
})