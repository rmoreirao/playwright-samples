import { test, expect } from '@playwright/test';

/**
 * Test suite for Ping Pong Web Shop - Cart Page - Empty Cart Checkout
 * Based on exploratory test case EXP-014 from PING_PONG_WEBSHOP_TEST_CASES.md
 */
test.describe('Ping Pong Web Shop - Cart Page - Empty Cart Checkout', () => {
  const BASE_URL = 'https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop';
  const NOTIFICATION_TIMEOUT = 2000;

  /**
   * EXP-014: Verify checkout is blocked when cart is empty
   * Priority: Critical
   * Test Type: Functional
   * Current Status: KNOWN BUG - Currently failing - checkout succeeds with empty cart and shows success message
   * 
   * This test is expected to FAIL because of the bug - it verifies that checkout should be blocked
   * but the current application allows checkout with empty cart and shows a success message
   */
  test('EXP-014: Checkout should be blocked when cart is empty [EXPECTED TO FAIL - BUG]', async ({ page }) => {
    await test.step('Navigate to cart page with empty cart', async () => {
      // Clear any existing cart data to ensure we start with an empty cart
      await page.goto(`${BASE_URL}/index.html`);
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      
      // Navigate to cart page
      await page.goto(`${BASE_URL}/pages/cart.html`);
      await expect(page).toHaveURL(/cart\.html/);
    });

    await test.step('Verify cart is empty', async () => {
      // Verify the empty cart message is displayed
      const emptyCartMessage = page.getByText('Your cart is empty.');
      await expect(emptyCartMessage).toBeVisible();
    });

    await test.step('Attempt to click Checkout button', async () => {
      // Locate the Checkout button
      const checkoutButton = page.getByRole('button', { name: /checkout/i });
      
      // Verify checkout button exists
      await expect(checkoutButton).toBeVisible();
      
      // Click the Checkout button
      await checkoutButton.click();
    });

    await test.step('Verify checkout is blocked - no success message shown', async () => {
      // Expected Results per EXP-014:
      // - Button disabled or error preventing payment
      // - NO success message should be shown
      // 
      // BUG: Currently the app shows a success message even with empty cart
      // This test checks that NO success message appears - it should FAIL because of the bug
      
      // Wait for page to be fully loaded and any notifications to appear
      await page.waitForLoadState('networkidle');
      
      // Primary assertion: NO success message should be shown
      // This will FAIL if the bug exists (success message is shown)
      const anySuccessMessage = page.locator('text=/success|successfully|order.*placed|thank.*you|payment.*processed/i');
      await expect(anySuccessMessage.first()).not.toBeVisible({
        timeout: NOTIFICATION_TIMEOUT
      });
      
      // Secondary verification: should not navigate away from cart page
      expect(page.url()).toContain('cart.html');
    });
  });
});
