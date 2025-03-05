import * as esbuild from 'esbuild';

const commonConfig = {
  entryPoints: ['src/calculate.ts'],
  target: 'esnext',
  sourcemap: true,
};

const libConfig = {
  bundle: false,
  minify: false,
};

const browserConfig = {
  bundle: true,
  minify: true,
  format: 'esm',
};

Promise.all([
  esbuild.build({
    ...commonConfig,
    ...libConfig,
    outfile: 'dist/cjs/calculator.mjs',
    format: 'esm',
  }),
  esbuild.build({
    ...commonConfig,
    ...libConfig,
    outfile: 'dist/esm/calculator.cjs',
    format: 'cjs',
  }),
  esbuild.build({
    ...commonConfig,
    ...browserConfig,
    outfile: 'dist/browser/calculator.js',
  }),
]).catch(() => process.exit(1));
