// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    ignoreHTTPSErrors: true,
    trace: 'on',
    launchOptions: {
      headless: true,
      args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
    }
  },
});
