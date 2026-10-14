import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // three.js only ships inside the lazily loaded Arena chunk.
  build: { chunkSizeWarningLimit: 1100 },
});
