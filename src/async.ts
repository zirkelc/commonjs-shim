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

export default commonjsShim;
