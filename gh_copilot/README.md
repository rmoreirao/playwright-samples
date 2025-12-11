# Using Playwright MCP Server with GitHub Copilot

## Install Playwright MCP Server on VS Code
- Docs: https://github.com/microsoft/playwright-mcp
- File: /.vscode/mcp.json
1) Start MCP Server

## Inspect MCP Server with MCP Inspector

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

## Using GitHub Copilot with Playwright MCP Server

1) Select "Agent" mode in GitHub Copilot
2) Configure Tools
3) Enable / Disable specific tools (GH Copilot)
4) Using GH Copilot: ```Navigate to "https://playwright.dev" and click on the "Get Started" link using Playwright MCP Server tools.```

## Setting the Scene for the this Sample
- We are creating the test cases from this Repository, which does not have access to the code of the WebSite under test.
- The WebSite under test is a simple Ping Pong Web Shop: https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop/index.html
- The test cases will be created by exploring the WebSite using Playwright MCP Server tools and

## GitHub Copilot Custom Instructions for Playwright
- **Docs**: https://code.visualstudio.com/docs/copilot/customization/custom-instructions and https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions
- **Sample file**: .github\instructions\playwright.instructions.md
- **More Inspiration**: https://github.com/github/awesome-copilot

## PLAN - Explore the WebSite and suggest Test Scenarios from Navigation

Use the Playwright MCP Server tools to explore the WebSite and suggest Test Scenarios based on the navigation and interactions performed.
Example:

- **Prompt file**: .github/prompts/exploratory_test_cases_creation.prompt.md
- **Execute on GH Copilot Agent Mode**: /exploratory_test_cases_creation website_url: https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop/index.html

- **Export to GitHub**: use GH MCP tool "github_create_issue" to create issues for each suggested test case.
Prompt:
```
Create Github issues using the GitHub MCP Server tools for the following test cases "## Cart Page" section in file #file:gh_copilot\PING_PONG_WEBSHOP_TEST_CASES.md
```

### GENERATE - Create Tests from Instructions - Agent Mode Locally

Prompt:
```
Implement Playwright EXP-001 test cases from file #file:gh_copilot\PING_PONG_WEBSHOP_TEST_CASES.md.
Use Playwright MCP Server tools to navigate to the URL defined on the test case specification and implement the test steps as described.
The test cases must be implemented under the "gh_copilot\test-cases" folder in a single file named "ping-pong-web-shop-test-cases.spec.ts".
Run the Playwright tests after implementing it and report back the results.
Custom Instructions on #file:.github\instructions\playwright.instructions.md
```

### GENERATE - Create Tests from Instructions - Copilot Coding Agent with Custom Agent + Running Tests after Implementing it!

Prompt - !!Do it from the GitHub WebSite!!:
```
Implement Playwright EXP-006 test cases from file #file:gh_copilot\PING_PONG_WEBSHOP_TEST_CASES.md.
Use Playwright MCP Server tools to navigate to the URL defined on the test case specification and implement the test steps as described.
The test cases must be implemented under the "gh_copilot\test-cases" folder in a single file named "ping-pong-web-shop-products-test-cases.spec.ts".

Execute the tests after implementing it and report back the results.
Run the Playwright tests after implementing it and report back the results.
Custom Instructions on #file:.github\instructions\playwright.instructions.md
```

### HEAL - Debug current bugs and fix code

Break one test case and then prompt Copilot to fix it:
```
Debug and fix the failing test case EXP-006 from file #file:gh_copilot\PING_PONG_WEBSHOP_TEST_CASES.md.
The test case is implemented on file #file:gh_copilot\test-cases\ping-pong-web-shop-products-test-cases.spec.ts.
Use Playwright MCP Server tools to navigate to the URL defined on the test case specification and identify the issue on the test implementation.
Fix the test case implementation to ensure it passes successfully.
Custom Instructions on #file:.github\instructions\playwright.instructions.md
```

### PLAN, GENERATE and HEAL - Playwright Agents

Docs: https://playwright.dev/docs/test-agents
On VS Code execute: ```npx playwright init-agents --loop=vscode```

Sample Prompts for Playwright Agents:
**Planner**: 
```
Explore the web application at URL: https://rmoreirao.github.io/GHCopilotAgentPingPongWebShop/index.html and create a comprehensive test plan for basic operations.
```
**Generator**:
```
Generate the tests for the '#### 1'
```
**Healer**:
```
Fix the failing test case for '#### 1'
```

### FEELING Creative?? Other Ideas
- Create Performance Tests using Playwright MCP Server tools
- Create Accessibility & Security Tests using Playwright MCP Server tools
- Create Visual Regression Tests using Playwright MCP Server tools
- Create User Manuals using Playwright MCP Server tools
- Validate the Documentation using Playwright MCP Server tools
- Validate User Journeys using Playwright MCP Server tools
- Automatically create Bug Reports using Playwright MCP Server tools + GitHub MCP
- ...