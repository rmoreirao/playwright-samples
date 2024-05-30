import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; 

test.describe('homepage', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page } , testInfo) => {
    await page.goto('https://playwright.dev/'); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});