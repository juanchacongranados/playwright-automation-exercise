// tests/sanity.spec.js

import { test, expect } from '@playwright/test';

test('sanity: carga la página principal', async ({ page }) => {
  await page.goto('https://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);
});
