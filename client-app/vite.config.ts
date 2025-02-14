import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    build: {
      outDir: '../HtmlRunnersFirstStage.Api/wwwroot',
      emptyOutDir: true
    },
    plugins: [react()],
    server: {
      port: 3000,
      host: '127.0.0.1',
    },
  };
});
