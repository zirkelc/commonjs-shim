import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';

/**
 * CommonJS Shim function
 * This function creates the `require`, `__filename`, and `__dirname` in the global scope.
 *
 * @example
 * import { commonjsShim } from 'commonjs-shim';
 *
 * commonjsShim(import.meta.url);
 *
 * @see https://github.com/evanw/esbuild/issues/1921#issuecomment-1623640043
 * @see https://github.com/evanw/esbuild/issues/1921#issuecomment-1898197331
 */
export const commonjsShim = (importMetaUrl: string) => {
  globalThis.require = createRequire(importMetaUrl);
  globalThis.__filename = url.fileURLToPath(importMetaUrl);
  globalThis.__dirname = path.dirname(__filename);
};

/**
 * CommonJS Shim banner
 * Use this banner to inject the CommonJS Shim into bundled code.
 *
 * {@link https://esbuild.github.io/api/#banner | esbuild banner}
 *
 * @example
 * import { commonjsBanner } from 'commonjs-shim';
 * import * as esbuild from 'esbuild';
 *
 * await esbuild.build({
 *   entryPoints: ['app.js'],
 *   banner: {
 *     js: commonjsBanner,
 *   },
 *   outfile: 'out.js',
 * })
 */
export const commonjsBanner = `
/* banner start: commonjs-shim */
globalThis.require = createRequire(import.meta.url);
globalThis.__filename = url.fileURLToPath(import.meta.url);
globalThis.__dirname = path.dirname(__filename);
/* banner end: commonjs-shim */
`;
