import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// `base: './'` lets the built site be hosted from any sub-path or opened from a static host.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: { target: 'es2022', chunkSizeWarningLimit: 700 },
});
