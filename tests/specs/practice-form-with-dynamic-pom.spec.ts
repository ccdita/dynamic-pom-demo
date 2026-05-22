import { test } from '@playwright/test';
import FormPage from '../pages/form-page';
import hooks from '../utils/hooks';
import pages from '../utils/pages';

let formPage: FormPage;

/**
 * Sets up the test environment before each test
 */
test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 30000); // Extend timeout to up to a minute since the webpage is slow to load
    // Go to the practice form page before each test, then instantiate a FormPage object
    formPage = await hooks.beforeEach(page, FormPage, pages.practiceForm);
});

test.describe('Practice Form', () => {
    
    /**
     * Fills all fields (except the file upload) with valid data and verifies the form submission
     */
    test('Fill all fields (except the file upload) with valid data', async () => {
        await formPage.completeAllFieldsValidData();
        await formPage.checkSuccessfulFormSubmission();
    });
});