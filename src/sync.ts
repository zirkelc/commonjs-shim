import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';

/**
 * The `require` function and `__filename` and `__dirname` globals are not available in ES modules (ESM).
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

export default commonjsShim;
