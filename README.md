# 🎭 Playwright for UI and API Test Automation Framework using Typescript

### [Documentation](https://playwright.dev) | [API reference](https://playwright.dev/docs/api/class-playwright)

Playwright is a framework for Web Testing and Automation. It allows testing [Chromium](https://www.chromium.org/Home), [Firefox](https://www.mozilla.org/en-US/firefox/new/) and [WebKit](https://webkit.org/) with a single API. Playwright is built to enable cross-browser web automation that is **ever-green**, **capable**, **reliable** and **fast**.

## Features of this framework
* [Design Pattern: Page Object Model](https://playwright.dev/docs/test-pom)
* [Playwright Report](https://playwright.dev/docs/test-reporters)
* [Authentication of Multiple Users](https://playwright.dev/docs/auth)
* [Playwright for API testing](https://playwright.dev/docs/api-testing)
* [Cloud Integration: Microsoft Playwright Testing](https://learn.microsoft.com/en-us/azure/playwright-testing/quickstart-run-end-to-end-tests?tabs=playwrightcli)

## Getting Started

### Playwright Intro
* Follow steps here: https://playwright.dev/docs/intro

### To run this locally
* Install Playwright using npm: `npm install -D @playwright/test`

### Playwright Commands
* Create project: `npm init playwright@latest`
* Run the tests: `npx playwright test`
* Run the tests with specific config file: `npx playwright test -c {config filename}` 
* Run test with specific browser: `npx playwright test --project=chromium`
* Run test with Show Browser: `npx playwright test --headed`
* Run test with debug: `npx playwright test --debug`
* Run test with trace: `npx playwright test --trace on`
* Run test in UI Mode: `npx playwright test --ui`
* Auto generate code: `npx playwright codegen`
* Show report: `npx playwright show-report`