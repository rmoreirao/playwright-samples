# Exploratory Test Cases - Ping Pong Shop

**Target Application:** https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop/index.html  
**Test Date:** November 21, 2025  

---

## Home Page

### EXP-001
- **Test Case ID:** EXP-001
- **Priority:** High
- **Test Type:** Functional
- **Test Case Title:** Verify that the Shop Now CTA navigates to the full products listing when clicked from Home
- **Objective:** Ensure primary conversion path works; mitigates broken link risk
- **Preconditions:** User is on Home page (`/index.html`)
- **Test Steps:**
  1. Locate and click the "Shop Now" link.
- **Expected Results:**
  - Step 1: Browser navigates to `pages/products.html?cat=all` and shows Products H1.
- **Pass/Fail Criteria:** Pass if destination URL loads with product list; Fail if navigation broken or empty.

### EXP-002
- **Test Case ID:** EXP-002
- **Priority:** Medium
- **Test Type:** User Interface
- **Test Case Title:** Verify that duplicate navigation entries (two "Ping Pong Shop" menu items) both return to Home
- **Objective:** Validate consistent navigation behavior; detect redundant/misconfigured links
- **Preconditions:** Any page other than Home (e.g., Products)
- **Test Steps:**
  1. Click first "Ping Pong Shop" menu item.
  2. Navigate again to Products.
  3. Click second "Ping Pong Shop" menu item.
- **Expected Results:**
  - Step 1: Returns to `/index.html`.
  - Step 2: Products page loads.
  - Step 3: Returns to `/index.html`.
- **Pass/Fail Criteria:** Both links must correctly navigate without errors.

### EXP-003
- **Test Case ID:** EXP-003
- **Priority:** Low
- **Test Type:** Accessibility
- **Test Case Title:** Verify that the hero image includes meaningful alternative text
- **Objective:** Ensure non-text content is accessible; mitigates screen reader info loss
- **Preconditions:** Home page loaded
- **Test Steps:**
  1. Inspect hero image alt attribute via accessibility tree.
- **Expected Results:**
  - Step 1: Alt text = "Professional table tennis player in action".
- **Pass/Fail Criteria:** Pass if alt present, descriptive, non-empty.

### EXP-004
- **Test Case ID:** EXP-004
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify that the Play Pong Game link from hero section navigates to the game page
- **Objective:** Confirm secondary engagement path works
- **Preconditions:** Home page loaded
- **Test Steps:**
  1. Click "Play Pong Game" link in hero area.
- **Expected Results:**
  - Step 1: Page loads `/pages/play.html` with H1 "Play Ping Pong".
- **Pass/Fail Criteria:** Pass if correct page and title; Fail otherwise.

### EXP-005
- **Test Case ID:** EXP-005
- **Priority:** Medium
- **Test Type:** Accessibility
- **Test Case Title:** Verify keyboard focus order starts at navigation and proceeds to hero content logically
- **Objective:** Ensure logical tab order; mitigates keyboard navigation frustration
- **Preconditions:** Home page loaded; focus at top (press Tab)
- **Test Steps:**
  1. Press Tab repeatedly to traverse first 10 focusable elements.
- **Expected Results:**
  - Step 1: Order: first menu item → subsequent menu items → "Shop Now" → "Play Pong Game" → next interactive elements (consistent with visual flow).
- **Pass/Fail Criteria:** Pass if sequence matches logical reading order without skips or traps.

---

## Products Page

### EXP-006
- **Test Case ID:** EXP-006
- **Priority:** Critical
- **Test Type:** Functional
- **Test Case Title:** Verify that adding a product to cart creates a new cart entry with quantity 1
- **Objective:** Validate core e-commerce add-to-cart function
- **Preconditions:** Products page; cart empty
- **Test Steps:**
  1. Click "Add to Cart" for "Butterfly Tenergy 05".
  2. Navigate to Cart.
- **Expected Results:**
  - Step 1: Success notification appears.
  - Step 2: Cart shows "Butterfly Tenergy 05 - $89.99 x 1".
- **Pass/Fail Criteria:** Pass if item listed with correct price/quantity.

### EXP-007
- **Test Case ID:** EXP-007
- **Priority:** High
- **Test Type:** Functional
- **Test Case Title:** Verify that adding the same product again increments quantity instead of duplicate line items
- **Objective:** Prevent duplicate cart entries; ensure quantity logic
- **Preconditions:** Cart contains "Butterfly Tenergy 05" x1
- **Test Steps:**
  1. Return to Products.
  2. Click "Add to Cart" for "Butterfly Tenergy 05".
  3. Navigate to Cart.
- **Expected Results:**
  - Step 2: Notification indicates quantity updated.
  - Step 3: Cart shows "Butterfly Tenergy 05 - $89.99 x 2".
- **Pass/Fail Criteria:** Single line item with updated quantity.

### EXP-008
- **Test Case ID:** EXP-008
- **Priority:** High
- **Test Type:** Functional
- **Test Case Title:** Verify search returns matching product when valid keyword entered
- **Objective:** Ensure search indexing works; risk mitigation for discoverability
- **Preconditions:** Products page loaded; clear search field
- **Test Steps:**
  1. Enter "Tenergy" in search box.
- **Expected Results:**
  - Step 1: Only "Butterfly Tenergy 05" displayed with correct price.
- **Pass/Fail Criteria:** Pass if single expected match appears; Fail if extra or none.

### EXP-009
- **Test Case ID:** EXP-009
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify search displays no results and notification for non-matching term
- **Objective:** Validate negative search flow and user feedback
- **Preconditions:** Products page; clear search
- **Test Steps:**
  1. Enter "zzzz" in search box.
- **Expected Results:**
  - Step 1: "No products found." message and info notification.
- **Pass/Fail Criteria:** Pass if empty state + notification shown.

### EXP-010
- **Test Case ID:** EXP-010
- **Priority:** High
- **Test Type:** Functional
- **Test Case Title:** Verify category filter shows only products of selected category (Balls)
- **Objective:** Validate filtering logic; detect current defect (returns none)
- **Preconditions:** Products page; clear search; items visible
- **Test Steps:**
  1. Select "Balls" in category combobox.
  2. Observe product list.
- **Expected Results:**
  - Step 1: Page reload or dynamic update.
  - Step 2: At least one ball product (e.g., "Butterfly G40+ 3-Star Balls") displayed.
- **Pass/Fail Criteria:** Pass if relevant items appear; currently fails (bug: empty result).

---

## Cart Page

### EXP-011
- **Test Case ID:** EXP-011
- **Priority:** High
- **Test Type:** Functional
- **Test Case Title:** Verify cart aggregates quantities for same product
- **Objective:** Ensure cart logic correctness
- **Preconditions:** Add "Butterfly Tenergy 05" twice
- **Test Steps:**
  1. Navigate to Cart.
- **Expected Results:**
  - Step 1: Single line with quantity x2.
- **Pass/Fail Criteria:** Pass if aggregated; Fail if duplicate lines.

### EXP-012
- **Test Case ID:** EXP-012
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify removing a product updates cart and displays notification
- **Objective:** Validate removal feedback
- **Preconditions:** Cart contains at least one product
- **Test Steps:**
  1. Click "Remove" for a product.
- **Expected Results:**
  - Step 1: Product line disappears; notification shows removal.
- **Pass/Fail Criteria:** Pass if removal immediate and message present.

### EXP-013
- **Test Case ID:** EXP-013
- **Priority:** High
- **Test Type:** Functional
- **Test Case Title:** Verify removing last product shows empty cart message
- **Objective:** Confirm empty state handling
- **Preconditions:** Cart has exactly one product line
- **Test Steps:**
  1. Click "Remove".
- **Expected Results:**
  - Step 1: "Your cart is empty." message displayed.
- **Pass/Fail Criteria:** Pass if message appears; Fail if stale line remains.

### EXP-014
- **Test Case ID:** EXP-014
- **Priority:** Critical
- **Test Type:** Functional
- **Test Case Title:** Verify checkout is blocked when cart is empty
- **Objective:** Prevent invalid transactions; currently failing (bug)
- **Preconditions:** Empty cart
- **Test Steps:**
  1. Click "Checkout".
- **Expected Results:**
  - Step 1: Button disabled or error preventing payment; no success message.
- **Pass/Fail Criteria:** Pass if blocked; currently fails (success message shown).

### EXP-015
- **Test Case ID:** EXP-015
- **Priority:** Medium
- **Test Type:** User Interface
- **Test Case Title:** Verify notification close button removes message without altering cart contents
- **Objective:** Ensure UI dismissal does not mutate data
- **Preconditions:** Trigger any cart notification (add or remove item)
- **Test Steps:**
  1. Click notification "Close" button.
  2. Re-check cart lines.
- **Expected Results:**
  - Step 1: Notification removed.
  - Step 2: Cart lines unchanged.
- **Pass/Fail Criteria:** Pass if only UI element dismissed.

---

## Contact Page

### EXP-016
- **Test Case ID:** EXP-016
- **Priority:** High
- **Test Type:** Functional
- **Test Case Title:** Verify form prevents submission with all fields empty
- **Objective:** Validate required field enforcement; currently missing (bug)
- **Preconditions:** Contact page loaded; no inputs entered
- **Test Steps:**
  1. Click "Send Message".
- **Expected Results:**
  - Step 1: Inline validation messages; submission blocked.
- **Pass/Fail Criteria:** Pass if blocked with errors; currently fails (no errors).

### EXP-017
- **Test Case ID:** EXP-017
- **Priority:** High
- **Test Type:** Functional
- **Test Case Title:** Verify invalid email format triggers error and prevents submission
- **Objective:** Ensure email pattern validation; mitigates bad data
- **Preconditions:** Contact form; Email field contains "invalid"
- **Test Steps:**
  1. Fill sample data except valid email.
  2. Click "Send Message".
- **Expected Results:**
  - Step 2: Email error displayed; no success.
- **Pass/Fail Criteria:** Pass if error; currently fails (no validation).

### EXP-018
- **Test Case ID:** EXP-018
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify phone field rejects non-numeric characters
- **Objective:** Confirm input sanitization
- **Preconditions:** Contact form; Phone = "abc"
- **Test Steps:**
  1. Attempt submission.
- **Expected Results:**
  - Step 1: Phone validation error shown.
- **Pass/Fail Criteria:** Pass if prevented; current failure (accepts non-numeric).

### EXP-019
- **Test Case ID:** EXP-019
- **Priority:** Medium
- **Test Type:** Accessibility
- **Test Case Title:** Verify each form control has an associated accessible label
- **Objective:** Ensure screen reader clarity
- **Preconditions:** Contact page loaded
- **Test Steps:**
  1. Inspect accessibility tree for Name, Email, Phone, Subject, Message fields.
- **Expected Results:**
  - Step 1: Each textbox exposed with correct label text.
- **Pass/Fail Criteria:** Pass if all labeled.

### EXP-020
- **Test Case ID:** EXP-020
- **Priority:** Low
- **Test Type:** User Interface
- **Test Case Title:** Verify focus moves sequentially through form fields via Tab key
- **Objective:** Validate predictable keyboard navigation
- **Preconditions:** Focus at top of form (click Name)
- **Test Steps:**
  1. Press Tab repeatedly through all fields and button.
- **Expected Results:**
  - Step 1: Order: Name → Email → Phone → Subject → Message → Send Message.
- **Pass/Fail Criteria:** Pass if sequence matches; Fail if skipped or looped.

---

## Blog

### EXP-021
- **Test Case ID:** EXP-021
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify each blog article link navigates to its content page
- **Objective:** Ensure content discoverability
- **Preconditions:** Blog index page loaded
- **Test Steps:**
  1. Click "History of Table Tennis".
- **Expected Results:**
  - Step 1: Article page loads with H1 "History of Table Tennis".
- **Pass/Fail Criteria:** Pass if correct page content visible.

### EXP-022
- **Test Case ID:** EXP-022
- **Priority:** Low
- **Test Type:** Accessibility
- **Test Case Title:** Verify heading hierarchy on article page is logical (H1 then H2 sections)
- **Objective:** Improve semantic structure for assistive tech
- **Preconditions:** Article page loaded
- **Test Steps:**
  1. Enumerate heading levels.
- **Expected Results:**
  - Step 1: Single H1 followed by multiple H2; no skipped levels.
- **Pass/Fail Criteria:** Pass if hierarchical; Fail if disorder.

### EXP-023
- **Test Case ID:** EXP-023
- **Priority:** Low
- **Test Type:** User Interface
- **Test Case Title:** Verify navigation back to Blog index via main Blog link
- **Objective:** Confirm return path usability
- **Preconditions:** Inside any article
- **Test Steps:**
  1. Click "Blog" navigation link.
- **Expected Results:**
  - Step 1: Blog index list visible with multiple articles.
- **Pass/Fail Criteria:** Pass if list reappears.

### EXP-024
- **Test Case ID:** EXP-024
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify all article links use consistent URL pattern
- **Objective:** Detect broken or inconsistent routing
- **Preconditions:** Blog index loaded
- **Test Steps:**
  1. Inspect href attributes of each article link.
- **Expected Results:**
  - Step 1: Each link uses `blog-<slug>.html` naming convention.
- **Pass/Fail Criteria:** Pass if consistent pattern; Fail if deviations.

### EXP-025
- **Test Case ID:** EXP-025
- **Priority:** Low
- **Test Type:** Functional
- **Test Case Title:** Verify presence of at least one paragraph per section in article
- **Objective:** Ensure content completeness
- **Preconditions:** Article page loaded
- **Test Steps:**
  1. For each H2 section, check following paragraph exists.
- **Expected Results:**
  - Step 1: Each H2 followed by at least one paragraph node.
- **Pass/Fail Criteria:** Pass if all sections have content.

---

## Play Pong Game

### EXP-026
- **Test Case ID:** EXP-026
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify default game mode is Player vs Computer on initial load
- **Objective:** Ensure sensible default gameplay
- **Preconditions:** Game page loaded fresh
- **Test Steps:**
  1. Inspect game mode combobox selection.
- **Expected Results:**
  - Step 1: "Player vs Computer" selected.
- **Pass/Fail Criteria:** Pass if correct default.

### EXP-027
- **Test Case ID:** EXP-027
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify switching to Two Players updates game mode selection
- **Objective:** Confirm mode switching capability
- **Preconditions:** Game page loaded
- **Test Steps:**
  1. Change combobox selection to "Two Players".
- **Expected Results:**
  - Step 1: Selection updates; internal mode changes (visual or state ready for two-player controls).
- **Pass/Fail Criteria:** Pass if selection persists.

### EXP-028
- **Test Case ID:** EXP-028
- **Priority:** Low
- **Test Type:** Accessibility
- **Test Case Title:** Verify game region has accessible label and alt text for visual element
- **Objective:** Ensure game area announced meaningfully
- **Preconditions:** Game page loaded
- **Test Steps:**
  1. Check region label.
  2. Inspect image alt text.
- **Expected Results:**
  - Step 1: Region labeled "Interactive Pong game".
  - Step 2: Image alt = "Pong game".
- **Pass/Fail Criteria:** Pass if both present.

### EXP-029
- **Test Case ID:** EXP-029
- **Priority:** Low
- **Test Type:** User Interface
- **Test Case Title:** Verify controls instructions display correct key mappings
- **Objective:** Prevent user confusion on controls
- **Preconditions:** Game page loaded
- **Test Steps:**
  1. Read controls text block.
- **Expected Results:**
  - Step 1: Shows "Player 1: W (up), S (down) | Player 2: Arrow Up, Arrow Down".
- **Pass/Fail Criteria:** Exact text present.

### EXP-030
- **Test Case ID:** EXP-030
- **Priority:** Medium
- **Test Type:** Functional
- **Test Case Title:** Verify tip section visibility and content relevance to gameplay
- **Objective:** Confirm helpful guidance presence
- **Preconditions:** Game page loaded
- **Test Steps:**
  1. Locate tip paragraph.
- **Expected Results:**
  - Step 1: Contains message about ball changing direction based on paddle hit location.
- **Pass/Fail Criteria:** Pass if tip present and descriptive.

---

## Summary of Notable Issues Found

### Critical Bugs
1. **Empty Cart Checkout (EXP-014)**: Checkout succeeds with empty cart, displaying success message instead of blocking the transaction.
2. **Category Filter Failure (EXP-010)**: Selecting "Balls" category returns "No products found" despite products existing in that category.

### High Priority Issues
3. **Missing Form Validation (EXP-016, EXP-017)**: Contact form accepts empty submission and invalid email formats without validation errors.
4. **Phone Field Validation (EXP-018)**: Phone field accepts non-numeric characters (e.g., "abc").

### Medium Priority Issues
5. **Duplicate Navigation Items (EXP-002)**: Two "Ping Pong Shop" menu items exist in the navigation (potential UX confusion).

---

## Recommendations

### Immediate Actions (Critical)
1. **Implement Cart Validation**: Add guard on Checkout button to disable when cart is empty or show error message preventing payment processing.
2. **Fix Category Filtering**: Debug and repair category filter logic to ensure proper product subset queries return expected results.

### High Priority Improvements
3. **Add Form Validation**: Implement client-side and server-side validation for Contact form:
   - Required field checks (Name, Email, Subject, Message)
   - Email format validation (RFC 5322 pattern)
   - Phone number format validation (numeric only or standard phone patterns)
   - Display inline error messages next to invalid fields

### UI/UX Enhancements
4. **Navigation Cleanup**: Remove duplicate "Ping Pong Shop" navigation item to avoid user confusion.
5. **Search Experience**: Consider adding auto-suggest or "Did you mean?" for search queries with no results.

### Testing Strategy
6. **Automated Test Coverage**: Create Playwright automated tests based on these exploratory test cases to:
   - Prevent regression of fixed bugs
   - Ensure continuous validation of critical user paths
   - Maintain 80%+ feature coverage as specified in requirements

### Accessibility Improvements
7. **Keyboard Navigation Audit**: Conduct comprehensive keyboard-only navigation test across all pages.
8. **Screen Reader Testing**: Validate with NVDA/JAWS to ensure all interactive elements are properly announced.
9. **Color Contrast Check**: Verify WCAG 2.1 Level AA compliance for all text and interactive elements.