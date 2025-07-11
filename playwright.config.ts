// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    launchOptions: {
      headless: true,
      args: ['--disable-blink-features=AutomationControlled'],
    }
  },
});
