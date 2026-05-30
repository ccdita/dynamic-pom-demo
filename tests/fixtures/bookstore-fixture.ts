import { test as base } from '@playwright/test';
import BookstorePage from '../pages/bookstore-page';
import hooks from '../utils/hooks';
import pages from '../utils/pages';

/**
 * Indicates that:
 * - MyFixtures is a custom type name
 * - Any object of type MyFixtures must have:
 *     - A property called bookstorePage
 *     - whoe value must be of type BookstorePage
 */
type MyFixtures = {
    bookstorePage: BookstorePage;
}

// Assures that MyFixtures will be provided by the test environment
export const test = base.extend<MyFixtures> ({

    bookstorePage: async ({ page }, use) => {
        // Instantiate a BookstorePage object
        const bookstorePage = await hooks.beforeEach(page, BookstorePage, pages.bookstore);
        // Run commands in tests that use this fixture
        await use(bookstorePage);
        // Post-test cleanup
        await bookstorePage.clearSearchbar();
    }
});

export { expect } from '@playwright/test';