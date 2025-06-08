import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
  server: {
    proxy: {
      '/python': {
        target: 'http://127.0.0.1:5005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/python/, ''), // ★ 필수
      },
    },
  },
});
