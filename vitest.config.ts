import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'integration',
          environment: 'jsdom',
          globals: true,
          include: ['tests/integration/**/*.test.tsx'],
          setupFiles: './tests/integration/setup.ts',
        },
      },
    ],
  },
});
