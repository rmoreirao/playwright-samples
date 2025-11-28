import { test, expect } from '@playwright/test';

/**
 * Test suite for Ping Pong Web Shop - Products Page
 * Based on exploratory test cases from PING_PONG_WEBSHOP_TEST_CASES.md
 */
test.describe('Ping Pong Web Shop - Products Page', () => {
  const BASE_URL = 'https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop';

  /**
   * EXP-006: Verify that adding a product to cart creates a new cart entry with quantity 1
   * Priority: Critical
   * Test Type: Functional
   */
  test('EXP-006: Adding a product to cart should create a new cart entry with quantity 1', async ({ page }) => {
    await test.step('Reset cart state and open Products page', async () => {
      await page.goto(`${BASE_URL}/index.html`);
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
      await expect(page).toHaveTitle('Products - Ping Pong Shop');
      await expect(page.getByRole('heading', { name: 'Products', level: 1 })).toBeVisible();
    });

    await test.step('Click "Add to Cart" for "Butterfly Tenergy 05"', async () => {
      const butterflyProductCard = page
        .locator('.product-card')
        .filter({ has: page.getByRole('heading', { name: 'Butterfly Tenergy 05', level: 3 }) });
      await butterflyProductCard.getByRole('button', { name: 'Add to Cart' }).click();
    });

    await test.step('Verify success notification appears', async () => {
      const notification = page.getByText('Butterfly Tenergy 05 added to cart');
      await expect(notification).toBeVisible();
    });

    await test.step('Navigate to Cart and verify item', async () => {
      await page.getByRole('link', { name: /cart/i }).click();
      await expect(page).toHaveURL(/cart\.html/);

      const cartContents = page.getByRole('main').getByText('Butterfly Tenergy 05 - $89.99 x 1');
      await expect(cartContents).toBeVisible();
    });
  });
});
