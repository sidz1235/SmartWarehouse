import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // use the PORT environment variable or default to 5173
    host: '0.0.0.0' // ensure the host is set to '0.0.0.0'
  }
});
