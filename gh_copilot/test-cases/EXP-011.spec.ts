import { test, expect } from '@playwright/test';

/**
 * Test suite for Ping Pong Web Shop - Cart Page
 * Test Case EXP-011: Verify cart aggregates quantities for same product
 */
test.describe('Ping Pong Web Shop - Cart Page', () => {
  const BASE_URL = 'https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop';

  /**
   * EXP-011: Verify cart aggregates quantities for same product
   * Priority: High
   * Test Type: Functional
   * Objective: Ensure cart logic correctness
   */
  test('EXP-011: Cart should aggregate quantities for same product', async ({ page }) => {
    await test.step('Reset cart and navigate to products', async () => {
      // Clear cart state
      await page.goto(`${BASE_URL}/index.html`);
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      // Navigate to products page
      await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
      await expect(page).toHaveTitle('Products - Ping Pong Shop');
      await expect(page.getByRole('heading', { name: 'Products', level: 1 })).toBeVisible();
    });

    await test.step('Add first instance of Butterfly Tenergy 05', async () => {
      const butterflyProductCard = page
        .getByRole('heading', { name: 'Butterfly Tenergy 05', level: 3 })
        .locator('xpath=..');
      await butterflyProductCard.getByRole('button', { name: 'Add to Cart' }).click();
      
      // Verify success notification appears
      const notification = page.getByText('Butterfly Tenergy 05 added to cart');
      await expect(notification).toBeVisible();
    });

    await test.step('Add second instance of Butterfly Tenergy 05', async () => {
      const butterflyProductCard = page
        .getByRole('heading', { name: 'Butterfly Tenergy 05', level: 3 })
        .locator('xpath=..');
      await butterflyProductCard.getByRole('button', { name: 'Add to Cart' }).click();
      
      // Verify success notification appears
      const notification = page.getByText('Butterfly Tenergy 05 added to cart');
      await expect(notification).toBeVisible();
    });

    await test.step('Verify cart shows single line with quantity x2', async () => {
      // Navigate to cart
      await page.getByRole('link', { name: /cart/i }).click();
      await expect(page).toHaveURL(/cart\.html/);

      // Verify there is only ONE line item for Butterfly Tenergy 05 (not duplicate lines)
      const cartItems = page.locator('main').getByText(/Butterfly Tenergy 05/);
      await expect(cartItems).toHaveCount(1);
      
      // Verify the quantity is x2 (cart should aggregate quantities for same product)
      const cartItemText = page.locator('main').getByText('Butterfly Tenergy 05 - $89.99 x 2');
      await expect(cartItemText).toBeVisible();
    });
  });
});
