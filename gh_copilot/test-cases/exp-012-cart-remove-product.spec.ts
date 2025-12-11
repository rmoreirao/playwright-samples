import { test, expect } from '@playwright/test';

/**
 * Test suite for Ping Pong Web Shop - Cart Page
 * Test Case EXP-012: Verify removing a product updates cart and displays notification
 */
test.describe('Ping Pong Web Shop - Cart Page', () => {
  const BASE_URL = 'https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop';

  /**
   * EXP-012: Verify removing a product updates cart and displays notification
   * Priority: Medium
   * Test Type: Functional
   * Objective: Validate removal feedback
   * Pass/Fail Criteria: Pass if removal immediate and message present
   */
  test('EXP-012: Removing a product should update cart and display notification', async ({ page }) => {
    await test.step('Reset cart state and navigate to Products page', async () => {
      await page.goto(`${BASE_URL}/index.html`);
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
      await expect(page).toHaveTitle('Products - Ping Pong Shop');
      await expect(page.getByRole('heading', { name: 'Products', level: 1 })).toBeVisible();
    });

    await test.step('Add "Butterfly Tenergy 05" to cart', async () => {
      const butterflyProductCard = page
        .getByRole('heading', { name: 'Butterfly Tenergy 05', level: 3 })
        .locator('xpath=..');
      await butterflyProductCard.getByRole('button', { name: 'Add to Cart' }).click();
      
      // Verify success notification appears
      const notification = page.getByText('Butterfly Tenergy 05 added to cart');
      await expect(notification).toBeVisible();
    });

    await test.step('Navigate to Cart page', async () => {
      await page.getByRole('link', { name: /cart/i }).click();
      await expect(page).toHaveURL(/cart\.html/);
      
      // Verify the product is in the cart
      const cartContents = page.getByRole('main').getByText('Butterfly Tenergy 05 - $89.99 x 1');
      await expect(cartContents).toBeVisible();
    });

    await test.step('Click "Remove" button for the product', async () => {
      // Find and click the Remove button
      const removeButton = page.getByRole('button', { name: /remove/i });
      await expect(removeButton).toBeVisible();
      await removeButton.click();
    });

    await test.step('Verify product line disappears from cart', async () => {
      // The product line should no longer be visible
      const cartContents = page.getByRole('main').getByText('Butterfly Tenergy 05 - $89.99 x 1');
      await expect(cartContents).not.toBeVisible();
    });

    await test.step('Verify removal notification appears', async () => {
      // Check for removal notification message
      const removalNotification = page.getByText(/removed from cart|removed successfully/i);
      await expect(removalNotification).toBeVisible();
    });
  });
});
