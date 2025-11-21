---
agent: agent
description: 'Create comprehensive test cases through systematic application exploration using Playwright MCP Server tools.'
tools: ['playwright/*']
---

## Objective
Systematically explore the web application using Playwright MCP Server tools to identify and document exploratory test cases that uncover bugs, usability issues, security vulnerabilities, and edge cases.

# Target Web Application
- URL: ${input:website_url}

## Execution Directives (Agent MUST perform)
Utilize Playwright MCP Server tools to navigate through the application, interact with UI elements, and explore various user flows. Focus on uncovering potential issues and edge cases that may not be covered by existing test cases.
!!! Don't assume any prior knowledge of the application. Explore as a new user would with the MCP Server tools !!!

## Exploration Strategy
1. **Initial Reconnaissance**: Map the application's main features, navigation flow, and user journeys
2. **Depth-First Exploration**: Deep dive into each feature to test boundaries and limitations
3. **Cross-Feature Testing**: Validate interactions between different features
4. **State Management**: Test various application states and transitions

## Test Case Documentation Format

For each identified test case, document the following:

### Required Fields:
- **Test Case ID**: Unique identifier (e.g., EXP-001)
- **Priority**: Critical | High | Medium | Low
- **Test Type**: Functional | User Interface | Accessibility
- **Test Case Title**: Clear, actionable title using format: "Verify that [condition/action] when [scenario]"
- **Objective**: Specific goal and what risk this test mitigates
- **Preconditions**: Required setup, test data, or application state before test execution
- **Test Steps**: 
  1. Numbered, atomic, reproducible actions
  2. Include specific test data values
  3. Specify interaction methods (click, keyboard, touch)
- **Expected Results**: Measurable, observable outcomes for each step
- **Pass/Fail Criteria**: Specific conditions that determine test success


## Coverage Areas

Ensure comprehensive coverage across these dimensions:

### 1. Functional Testing
- Happy path scenarios
- Alternative flows
- Boundary value analysis
- Negative testing (invalid inputs, missing data)
- Business rule validation
- Data persistence and retrieval

### 2. User Interface Testing
- Form validation and error messaging
- Navigation and breadcrumbs
- Responsive design breakpoints
- Visual consistency
- Loading states and animations
- Tooltips and help text

### 3. Accessibility (WCAG 2.1 Level AA)
- Keyboard navigation (Tab order, shortcuts)
- Screen reader compatibility
- Color contrast ratios
- Focus indicators
- ARIA labels and roles
- Alternative text for images
- Error identification and description

## Output Format

Generate test cases in:
**Markdown format** for documentation

## Success Criteria
- Minimum 80% feature coverage
- At least 5 test cases per major feature / main menu item
- Include both positive and negative scenarios
- Document at least 3 accessibility test cases
- Identify minimum 2 edge cases per user flow
- MCP Server tools used effectively for exploration