import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['verify-production.spec.ts', 'e2e/**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 4,
  reporter: 'list',
  use: {
    channel: 'chrome',
    trace: 'on-first-retry',
    video: process.env.RECORD_VIDEO === 'true' ? {
      mode: 'on',
      size: { width: 1280, height: 800 },
    } : undefined,
  },
  projects: [
    {
      name: 'desktop',
      use: {
        viewport: { width: 1440, height: 900 },
        channel: 'chrome',
      },
    },
    {
      name: 'mobile',
      use: {
        viewport: { width: 390, height: 844 },
        channel: 'chrome',
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'showcase',
      testMatch: 'e2e/showcase.spec.ts',
      use: {
        viewport: { width: 1280, height: 800 },
        channel: 'chrome',
        video: {
          mode: 'on',
          size: { width: 1280, height: 800 },
        },
      },
      timeout: 60000,
    },
  ],
});
