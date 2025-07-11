// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    launchOptions: {
      headless: true,
      args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
    }
  },
});
