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
    await test.step('Navigate to Products page with empty cart', async () => {
      await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
      await expect(page).toHaveTitle('Products - Ping Pong Shop');
      await expect(page.getByRole('heading', { name: 'Products', level: 1 })).toBeVisible();
    });

    await test.step('Click "Add to Cart" for "Butterfly Tenergy 05"', async () => {
      const butterflyProduct = page.getByRole('article').filter({ hasText: 'Butterfly Tenergy 05' });
      const addToCartButton = butterflyProduct.getByRole('button', { name: 'Add to Cart' });
      await addToCartButton.click();
    });

    await test.step('Verify success notification appears', async () => {
      const notification = page.getByRole('alert');
      await expect(notification).toContainText(/added|cart/i);
    });

    await test.step('Navigate to Cart and verify item', async () => {
      const cartLink = page.getByRole('link', { name: /cart/i });
      await cartLink.click();
      await expect(page).toHaveURL(/cart\.html/);

      // Verify cart shows "Butterfly Tenergy 05 - $89.99 x 1"
      await expect(page.getByText('Butterfly Tenergy 05')).toBeVisible();
      await expect(page.getByText('$89.99')).toBeVisible();
      await expect(page.getByText(/x\s*1|×\s*1/)).toBeVisible();
    });
  });
});
