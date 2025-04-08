/**
 * The `require` function and `__filename` and `__dirname` globals are not available in ES modules (ESM).
 * This function creates the `require`, `__filename`, and `__dirname` in the global scope.
 *
 * The async version of the `commonjsShim` function can be used to avoid naming collisions.
 *
 * @example
 * import { commonjsShim } from 'commonjs-shim';
 *
 * await commonjsShim(import.meta.url);
 *
 * @see https://github.com/evanw/esbuild/issues/1921#issuecomment-1623640043
 * @see https://github.com/evanw/esbuild/issues/1921#issuecomment-1898197331
 */
export const commonjsShim = async (importMetaUrl: string) => {
  const { createRequire } = await import('node:module');
  const { fileURLToPath } = await import('node:url');
  const { dirname } = await import('node:path');

  globalThis.require = createRequire(importMetaUrl);
  globalThis.__filename = fileURLToPath(importMetaUrl);
  globalThis.__dirname = dirname(globalThis.__filename);
};

/**
 * CommonJS Shim banner
 * Use this banner to inject the CommonJS Shim into bundled code.
 *
 * {@link https://esbuild.github.io/api/#banner | esbuild banner}
 *
 * @example
 * import { commonjsBanner } from 'commonjs-shim/async';
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
globalThis.require = (await import("node:module")).createRequire(import.meta.url);
globalThis.__filename = (await import("node:url")).fileURLToPath(import.meta.url);
globalThis.__dirname = (await import("node:path")).dirname(__filename);
/* banner end: commonjs-shim */
`;
