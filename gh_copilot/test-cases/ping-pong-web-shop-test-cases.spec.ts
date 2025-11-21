import { test, expect } from '@playwright/test';

/**
 * Test suite for Ping Pong Web Shop
 * Based on exploratory test cases from PING_PONG_WEBSHOP_TEST_CASES.md
 */
test.describe('Ping Pong Web Shop - Home Page Navigation', () => {
  const BASE_URL = 'https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop';

  /**
   * EXP-001: Verify that the Shop Now CTA navigates to the full products listing
   * Priority: High
   * Test Type: Functional
   */
  test('EXP-001: Shop Now CTA should navigate to products page with correct URL and heading', async ({ page }) => {
    // Precondition: Navigate to Home page
    await page.goto(`${BASE_URL}/index.html`);
    
    // Verify we're on the home page
    await expect(page).toHaveTitle('Ping Pong Shop - Home');
    
    // Test Step 1: Locate and click the "Shop Now" link
    const shopNowLink = page.getByRole('link', { name: 'Shop Now' });
    await expect(shopNowLink).toBeVisible();
    await shopNowLink.click();
    
    // Expected Results:
    // - Browser navigates to pages/products.html?cat=all
    await expect(page).toHaveURL(`${BASE_URL}/pages/products.html?cat=all`);
    
    // - Shows Products H1
    const productsHeading = page.getByRole('heading', { name: 'Products', level: 1 });
    await expect(productsHeading).toBeVisible();
    
    // - Product list should be visible
    const productCards = page.locator('[class*="product"]').first();
    await expect(productCards).toBeVisible();
  });

  /**
   * EXP-002: Verify that duplicate navigation entries both return to Home
   * Priority: Medium
   * Test Type: User Interface
   */
  test('EXP-002: Both "Ping Pong Shop" menu items should navigate to home page', async ({ page }) => {
    // Precondition: Navigate to Products page (any page other than Home)
    await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
    
    // Verify we're on the products page
    await expect(page).toHaveTitle('Products - Ping Pong Shop');
    
    // Test Step 1: Click first "Ping Pong Shop" menu item (with image)
    const firstPingPongShopLink = page.getByRole('link', { name: 'Ping Pong Shop' }).first();
    await expect(firstPingPongShopLink).toBeVisible();
    await firstPingPongShopLink.click();
    
    // Expected Result Step 1: Returns to /index.html
    await expect(page).toHaveURL(`${BASE_URL}/index.html`);
    await expect(page).toHaveTitle('Ping Pong Shop - Home');
    
    // Verify home page content
    await expect(page.getByRole('heading', { name: 'Your Ultimate Table Tennis Destination' })).toBeVisible();
    
    // Test Step 2: Navigate again to Products
    await page.goto(`${BASE_URL}/pages/products.html?cat=all`);
    await expect(page).toHaveTitle('Products - Ping Pong Shop');
    
    // Test Step 3: Click second "Ping Pong Shop" menu item (text only)
    const allPingPongShopLinks = page.getByRole('link', { name: 'Ping Pong Shop' });
    const linkCount = await allPingPongShopLinks.count();
    
    // Verify there are at least 2 links with name "Ping Pong Shop"
    expect(linkCount).toBeGreaterThanOrEqual(2);
    
    // Click the second one
    await allPingPongShopLinks.nth(1).click();
    
    // Expected Result Step 3: Returns to /index.html
    await expect(page).toHaveURL(`${BASE_URL}/index.html`);
    await expect(page).toHaveTitle('Ping Pong Shop - Home');
    
    // Verify home page content again
    await expect(page.getByRole('heading', { name: 'Your Ultimate Table Tennis Destination' })).toBeVisible();
  });
});