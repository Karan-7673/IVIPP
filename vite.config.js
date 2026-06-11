import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelHelpers: 'runtime',
      presets: ['@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  ]
});
