import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    glsl(),
  ],
  server: {
    port: 3000,
    strictPort: true,
    host: '::',
  }
})