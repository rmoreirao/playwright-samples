# Using Playwright MCP Server with GitHub Copilot

## Playwright MCP Server with VS Code

### Install Playwright MCP Server on VS Code
- Docs: https://github.com/microsoft/playwright-mcp
- File: /.vscode/mcp.json
1) Start MCP Server

### Inspect MCP Server with MCP Inspector

1) Execute: `npx @modelcontextprotocol/inspector`
2) Open url
3) Connect to MCP Server:
    - **Transport Type**: STDIO
    - **Command**: `npx`
    - **Arguments**: `@playwright/mcp@latest`
    - Click "Connect"
4) Navigate and Inspect
    - Click "List Tools"
    - Execute the tool "browser_navigate" with url "https://playwright.dev"
5) Check the Output **Page Snapshot** (YAML Format)
    - **AI-friendly**: Easy for Copilot to understand the page structure
    - **Hierarchical**: Shows elements with references (`[ref=e1]`, etc.) for interaction
    - **Includes metadata**: Element types (button, link), cursor styles, URLs, and text content
    - **Actionable**: The `ref` identifiers can be used by other MCP tools to click, type, or interact with specific elements

### Using GitHub Copilot with Playwright MCP Server

1) Select "Agent" mode in GitHub Copilot
2) Configure Tools
3) Enable / Disable specific tools (GH Copilot)

### GitHub Copilot Custom Instructions for Playwright
1) Check file: .github\instructions\playwright.instructions.md

### PLAN - Explore the WebSite and suggest Test Scenarios from Navigation

Use the Playwright MCP Server tools to explore the WebSite and suggest Test Scenarios based on the navigation and interactions performed.
Example:
    - **Prompt file**: .github/prompts/exploratory_test_cases_creation.prompt.md
    - **Execute on GH Copilot Agent Mode**: /exploratory_test_cases_creation website_url: https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop/index.html

### IMPLEMENT - Create Tests from Instructions - Agent Mode Locally

Prompt:
```
Implement Playwright EXP-001 test cases from file #file:gh_copilot\PING_PONG_WEBSHOP_TEST_CASES.md.
Use Playwright MCP Server tools to navigate to the URL defined on the test case specification and implement the test steps as described.
The test cases must be implemented under the "gh_copilot\test-cases" folder in a single file named "ping-pong-web-shop-test-cases.spec.ts".
```

### IMPLEMENT - Create Tests from Instructions - Copilot Coding Agent with Custom Agent

Prompt - !!Do it from the GitHub WebSite!!:
```
Implement Playwright EXP-006 test cases from file #file:gh_copilot\PING_PONG_WEBSHOP_TEST_CASES.md.
Use Playwright MCP Server tools to navigate to the URL defined on the test case specification and implement the test steps as described.
The test cases must be implemented under the "gh_copilot\test-cases" folder in a single file named "ping-pong-web-shop-products-test-cases.spec.ts".
```

### HEAL - Debug current bugs and fix code

Break one test case and then prompt Copilot to fix it:
```
Debug and fix the failing test case EXP-006 from file #file:gh_copilot\PING_PONG_WEBSHOP_TEST_CASES.md.
The test case is implemented on file #file:gh_copilot\test-cases\ping-pong-web-shop-products-test-cases.spec.ts.
Use Playwright MCP Server tools to navigate to the URL defined on the test case specification and identify the issue on the test implementation.
Fix the test case implementation to ensure it passes successfully.
```


### Custom Prompt for Creating Playwright Tests

### Create User Guides