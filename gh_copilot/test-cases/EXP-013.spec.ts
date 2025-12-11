import { test, expect } from '@playwright/test';

/**
 * Test suite for Ping Pong Web Shop - Cart Page
 * Test case: EXP-013
 */
test.describe('Ping Pong Web Shop - Cart Page', () => {
  const BASE_URL = 'https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop';

  /**
   * EXP-013: Verify removing last product shows empty cart message
   * Priority: High
   * Test Type: Functional
   * Objective: Confirm empty state handling
   */
  test('EXP-013: Removing last product should display empty cart message', async ({ page }) => {
    await test.step('Setup: Reset cart state and navigate to products page', async () => {
      await page.goto(`${BASE_URL}/index.html`);
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
      await expect(page).toHaveTitle('Products - Ping Pong Shop');
    });

    await test.step('Add one product to cart', async () => {
      const butterflyProductCard = page
        .getByRole('heading', { name: 'Butterfly Tenergy 05', level: 3 })
        .locator('xpath=..');
      await butterflyProductCard.getByRole('button', { name: 'Add to Cart' }).click();
      
      // Verify success notification
      const notification = page.getByText('Butterfly Tenergy 05 added to cart');
      await expect(notification).toBeVisible();
    });

    await test.step('Navigate to cart page', async () => {
      await page.getByRole('link', { name: /cart/i }).click();
      await expect(page).toHaveURL(/cart\.html/);
      
      // Verify the product is in the cart
      const cartContents = page.getByRole('main').getByText('Butterfly Tenergy 05 - $89.99 x 1');
      await expect(cartContents).toBeVisible();
    });

    await test.step('Click "Remove" button', async () => {
      const removeButton = page.getByRole('button', { name: /remove/i });
      await expect(removeButton).toBeVisible();
      await removeButton.click();
    });

    await test.step('Verify empty cart message appears', async () => {
      const emptyCartMessage = page.getByText('Your cart is empty.');
      await expect(emptyCartMessage).toBeVisible();
      
      // Verify the product is no longer visible
      const cartContents = page.getByRole('main').getByText('Butterfly Tenergy 05 - $89.99 x 1');
      await expect(cartContents).not.toBeVisible();
    });
  });
});
