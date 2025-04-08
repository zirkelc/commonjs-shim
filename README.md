[![CI](https://github.com/zirkelc/commonjs-shim/actions/workflows/ci.yml/badge.svg)](https://github.com/zirkelc/commonjs-shim/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/dt/commonjs-shim?label=commonjs-shim)](https://www.npmjs.com/package/commonjs-shim)

# CommonJS Shim

Shim for the `require`, `__filename`, and `__dirname` globals in Node.js.

## Motivation

The `require`, `__filename`, and `__dirname` globals do not exist in ES modules (ESM).
If you or any of your dependencies use these globals, you will encounter an error like this:

```js
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

This package provides both a sync and async version of this shim.
Use the async version if you encounter naming collisions like `SyntaxError: Identifier 'createRequire' has already been declared`.

### Sync

```ts
import { commonjsShim } from 'commonjs-shim';

commonjsShim(import.meta.url);
```

### Async

```ts
import { commonjsShim } from 'commonjs-shim/async';

await commonjsShim(import.meta.url);
```

## License

MIT

