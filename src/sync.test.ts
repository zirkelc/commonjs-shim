import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';

describe('sync', () => {
  test('should set up globals', async () => {
    const importMetaUrl = import.meta.url;
    const expectedFilename = fileURLToPath(importMetaUrl);
    const expectedDirname = path.dirname(expectedFilename);

    expect(globalThis.require).toBeUndefined();
    expect(globalThis.__filename).toBeUndefined();
    expect(globalThis.__dirname).toBeUndefined();

    const { commonjsShim } = await import('./sync.js');
    commonjsShim(importMetaUrl);

    expect(globalThis.require).toBeDefined();
    expect(globalThis.__filename).toBe(expectedFilename);
    expect(globalThis.__dirname).toBe(expectedDirname);

    const pathModule = globalThis.require('path');
    expect(pathModule).toBeDefined();
    expect(pathModule.join).toBeDefined();
  });
});
