import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// One self-contained HTML file (used for the hosted preview).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: { outDir: 'dist-single', target: 'es2022', chunkSizeWarningLimit: 2000 },
});
