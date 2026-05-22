import { Page } from '@playwright/test';
import { buildUrl } from './urlBuilder';
import FormPage from "../pages/form-page";

/**
 * Sets up the test environment before each test
 * 
 * @param page, The Playwright page object
 * @param PageObjectParam, The page object constructor to instantiate
 * @param targetPage, The target page to navigate to
 * @param params, Optional parameters to pass to the URL builder
 * @returns a page object
 */
async function beforeEach(
    page: Page,
    PageObjectParam: FormPage,
    targetPage: string,
    params?: Record<any, any>
) {
    // Build the URL with the target page, then go to it
    await page.goto(buildUrl(targetPage, params));
    // Instantiate a new page object from the page
    const pageObject = await new PageObjectParam(page);
    return pageObject;
}

export default { beforeEach };