import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    sync: 'src/sync.ts',
    async: 'src/async.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
});
