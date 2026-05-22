# Playwright test suite for dynamically initializing POMs within hooks

Welcome! This is a Playwright test suite that demonstrates dynamically initializing Page Object Models (POMs) within hooks. It uses the [practice form by DemoQA](https://demoqa.com/automation-practice-form). This repo is my solution to Ch 2, exercise 1 in the [TAU Advanced Playwright course](https://github.com/ccdita/tau-advanced-playwright).

## What is dynamic POM initialization within hooks?
Creating POMs inside a `beforeEach` hook is a standard practice in test automation to ensure that every test begins with a fresh and initialized instance of a page class. Below is one way to instantiate a POM in a `beforeEach` hook:

```typescript
test.beforeEach(async ({ page }) => {
    await page.goto(pages.practiceForm); // Go to the form page before each test
    formPage = new FormPage(page); // Instantiate a ProfilePage object with the page object
});
```
However, there is a more concise way to instantiate a POM in a `beforeEach` hook. We can use custom hooks for dynamic POM instantiation—we only need to pass in a valid page class and page URL, and the custom hook will handle the POM creation for us:

```typescript
test.beforeEach(async ({ page }) => {
    profilePage = await hooks.beforeEach(page, ProfilePage, pages.profile);
});
```

The above method eliminates hardcoded page instantiations and reduces code redundancy. It also makes tests much easier to scale. If we want to instantiate a POM of a new class, we only need to update the hook `PageObjectParam` parameter with the new class.

In this project, we demonstrate dynamic POM creation in [`practice-form-with-dynamic-pom.spec.ts`](./tests/specs/practice-form-with-dynamic-pom.spec.ts). For our hook function, we use [`hooks.ts`](./tests/utils/hooks.ts).

## How does this method work?

- Within a test, the `beforeEach` passes the `page` object, the desired class, the page URL to create the POM from, and any query parameters into a custom hook
- The hook...
    - Calls `urlBuilder`'s `buildUrl` method to construct a URL from the page URL and query parameters arguments
    - Navigates the page to the constructed URL
    - Instantiates a new page object instance using the page
    - Returns the new page object

## Why use this method?

| Feature | Description |
| ----- | ----- |
| **Reduced boilerplate** | Reduces code redundancy by consolidating setup routines in a single, reusable function |
| **Maximum reusability** | One dynamic hook can instantiate any page |
| **Cleaner test files** | Tests focus purely on actions and assertions instead of setup |

## References

- [Advanced Playwright course by Renata Andrade on Test Automation University](https://testautomationu.applitools.com/playwright-advanced/chapter2.html)
- [Actions on Playwright Docs](https://playwright.dev/docs/input)
- [Change timeout from a `beforeEach` hook on Playwright Docs](https://playwright.dev/docs/test-timeouts#change-timeout-from-a-beforeeach-hook)