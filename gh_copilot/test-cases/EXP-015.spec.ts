import { test, expect } from '@playwright/test';

/**
 * Test suite for EXP-015: Verify notification close button removes message without altering cart
 * Priority: Medium
 * Test Type: User Interface
 * Page: Cart Page
 */
test.describe('Ping Pong Web Shop - Cart Page Notifications', () => {
  const BASE_URL = 'https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop';
  const NOTIFICATION_SELECTOR = '.notification, [role="alert"], [class*="notification"], [class*="alert"], [class*="message"]';

  test.beforeEach(async ({ page }) => {
    // Reset cart state before each test
    await page.goto(`${BASE_URL}/index.html`);
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  /**
   * EXP-015: Verify notification close button removes message without altering cart contents
   * Objective: Ensure UI dismissal does not mutate data
   */
  test('EXP-015: Notification close button should remove message without altering cart', async ({ page }) => {
    await test.step('Add a product to cart to trigger notification', async () => {
      // Navigate to Products page
      await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
      await expect(page).toHaveTitle('Products - Ping Pong Shop');

      // Add Butterfly Tenergy 05 to cart
      const butterflyHeading = page.getByRole('heading', { name: 'Butterfly Tenergy 05', level: 3 });
      const butterflyProductCard = butterflyHeading.locator('..');
      await butterflyProductCard.getByRole('button', { name: 'Add to Cart' }).click();

      // Verify notification appears
      const notification = page.getByText('Butterfly Tenergy 05 added to cart');
      await expect(notification).toBeVisible();
    });

    await test.step('Navigate to Cart page', async () => {
      await page.getByRole('link', { name: /cart/i }).click();
      await expect(page).toHaveURL(/cart\.html/);
    });

    await test.step('Capture initial cart state', async () => {
      // Verify the cart has the item
      const cartItem = page.getByRole('main').getByText('Butterfly Tenergy 05 - $89.99 x 1');
      await expect(cartItem).toBeVisible();
    });

    await test.step('Remove the item to trigger another notification', async () => {
      // Click Remove button to trigger notification
      const removeButton = page.getByRole('button', { name: 'Remove' });
      await removeButton.click();

      // Verify removal notification appears
      const removalNotification = page.locator(NOTIFICATION_SELECTOR).filter({ hasText: /removed|deleted/i });
      await expect(removalNotification.first()).toBeVisible({ timeout: 5000 });
    });

    await test.step('Click notification Close button', async () => {
      // Find and click the close button
      const closeButton = page.getByRole('button', { name: /close|dismiss|×/i }).first();
      await closeButton.click();
    });

    await test.step('Verify notification is removed', async () => {
      // Verify notification is no longer visible
      const notification = page.locator(NOTIFICATION_SELECTOR);
      await expect(notification).toHaveCount(0);
    });

    await test.step('Verify cart state remains unchanged', async () => {
      // Verify cart shows empty message (as we removed the only item)
      const emptyCartMessage = page.getByText('Your cart is empty');
      await expect(emptyCartMessage).toBeVisible();
    });
  });

  /**
   * Additional test: Verify notification close after adding item doesn't affect cart
   */
  test('EXP-015-variant: Closing add notification should not affect cart contents', async ({ page }) => {
    await test.step('Add a product to cart', async () => {
      // Navigate to Products page
      await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
      await expect(page).toHaveTitle('Products - Ping Pong Shop');

      // Add Butterfly Tenergy 05 to cart
      const butterflyHeading = page.getByRole('heading', { name: 'Butterfly Tenergy 05', level: 3 });
      const butterflyProductCard = butterflyHeading.locator('..');
      await butterflyProductCard.getByRole('button', { name: 'Add to Cart' }).click();

      // Verify notification appears
      const notification = page.getByText('Butterfly Tenergy 05 added to cart');
      await expect(notification).toBeVisible();
    });

    await test.step('Close the add notification', async () => {
      // Find and click the close button
      const closeButton = page.getByRole('button', { name: /close|dismiss|×/i }).first();
      await closeButton.click();

      // Verify notification is removed
      const notification = page.getByText('Butterfly Tenergy 05 added to cart');
      await expect(notification).not.toBeVisible();
    });

    await test.step('Navigate to Cart and verify item is still there', async () => {
      await page.getByRole('link', { name: /cart/i }).click();
      await expect(page).toHaveURL(/cart\.html/);

      // Verify the cart still has the item
      const cartItem = page.getByRole('main').getByText('Butterfly Tenergy 05 - $89.99 x 1');
      await expect(cartItem).toBeVisible();
    });
  });
});
