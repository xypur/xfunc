import { defineConfig } from 'tsdown'

export default defineConfig({
  // entry: ['./src/index.ts'],
  format: ['cjs', 'esm', 'umd'],
  outDir: './dist',
  dts: true,
  sourcemap: true,
  clean: false,
  outputOptions: {
    name: 'xfunc'
  }
})
