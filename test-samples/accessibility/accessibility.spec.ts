import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; 

test.describe('homepage', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page } , testInfo) => {
    await page.goto('https://demo.playwright.dev/todomvc'); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // await testInfo.attach('accessibility-scan-results', {
    //     body: JSON.stringify(accessibilityScanResults, null, 2),
    //     contentType: 'application/json'
    //   });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});