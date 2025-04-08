[![CI](https://github.com/zirkelc/commonjs-shim/actions/workflows/ci.yml/badge.svg)](https://github.com/zirkelc/commonjs-shim/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/dt/commonjs-shim?label=commonjs-shim)](https://www.npmjs.com/package/commonjs-shim)

# CommonJS Shim

Shim for the `require`, `__filename`, and `__dirname` globals in Node.js.

## Motivation

The `require`, `__filename`, and `__dirname` globals do not exist in ES modules (ESM).
If you or any of your dependencies use these globals, you will encounter an error like this:

```
Error: Dynamic require of "crypto" is not supported
```

## Installation

```bash
npm install commonjs-shim
# or
yarn add commonjs-shim
# or
pnpm add commonjs-shim
```

## Usage

This package provides both a synchronous and asynchronous version of this shim.
Use the asynchronous version if you encounter naming collisions like `SyntaxError: Identifier 'createRequire' has already been declared`.

## Shim

If you want to make the globals available in your own code, you can do so by importing the `commonjsShim` function and calling it with the `import.meta.url` argument.

### Synchronous

```ts
import { commonjsShim } from 'commonjs-shim';

commonjsShim(import.meta.url);
```

### Async

```ts
import { commonjsShim } from 'commonjs-shim/async';

await commonjsShim(import.meta.url);
```

## Banner

If you want to inject the shim into your bundled code, you can use the `commonjsBanner` template string.
For example, esbuild provides a [`banner` option](https://esbuild.github.io/api/#banner) that can be used to insert an arbitrary string at the beginning of generated JavaScript file:

```ts
import { commonjsBanner } from 'commonjs-shim'; // or 'commonjs-shim/async'
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['app.js'],
  banner: {
    js: commonjsBanner,
  },
  outfile: 'out.js',
})
```

## License

MIT

