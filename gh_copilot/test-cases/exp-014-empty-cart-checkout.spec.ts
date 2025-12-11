import { test, expect } from '@playwright/test';

/**
 * Test suite for Ping Pong Web Shop - Cart Page - Empty Cart Checkout
 * Based on exploratory test case EXP-014 from PING_PONG_WEBSHOP_TEST_CASES.md
 */
test.describe('Ping Pong Web Shop - Cart Page - Empty Cart Checkout', () => {
  const BASE_URL = 'https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop';

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
      
      // Wait for any potential notifications to appear after checkout click
      await page.waitForTimeout(2000);
      
      // Take a screenshot to see what's happening
      await page.screenshot({ path: '/tmp/exp-014-after-checkout.png', fullPage: true });
      
      // Get the page HTML for debugging
      const bodyText = await page.locator('body').textContent();
      console.log('Page content after checkout:', bodyText?.substring(0, 500));
      
      // Check for success message in various forms
      // The bug is that a success message IS shown when it shouldn't be
      const successPatterns = [
        page.getByText(/order.*success/i),
        page.getByText(/checkout.*success/i),
        page.getByText(/payment.*success/i),
        page.getByText(/successfully.*placed/i),
        page.getByText(/thank.*you/i),
        page.getByText(/success/i),
      ];
      
      // Check each pattern
      for (const pattern of successPatterns) {
        const isVisible = await pattern.isVisible().catch(() => false);
        if (isVisible) {
          const text = await pattern.textContent();
          console.log('Found success message:', text);
        }
      }
      
      // Primary assertion: NO success message should be shown
      // This will FAIL if the bug exists (success message is shown)
      const anySuccessMessage = page.locator('text=/success|successfully|order.*placed|thank.*you/i');
      await expect(anySuccessMessage.first()).not.toBeVisible({
        timeout: 2000
      });
      
      // Secondary verification: should not navigate away from cart page
      expect(page.url()).toContain('cart.html');
    });
  });
});
