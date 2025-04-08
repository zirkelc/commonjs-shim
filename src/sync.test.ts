import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('sync', () => {
  beforeEach(() => {
    vi.stubGlobal('require', undefined);
    vi.stubGlobal('__filename', undefined);
    vi.stubGlobal('__dirname', undefined);
  });

  test('should set up globals from function', async () => {
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
