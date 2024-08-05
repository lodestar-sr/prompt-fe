import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  minify: true,
  splitting: false,
  target: 'es2019',
  format: ['cjs', 'esm'],
  entry: ['src/index.ts'],
});
