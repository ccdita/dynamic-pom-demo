import { type Page, type Locator, expect } from '@playwright/test';

/**
 * A class with locators and methods for interacting with the Demo QA Bookstore page
 */
class BookstorePage {

    readonly page: Page;
    readonly searchbar: Locator;
    readonly resultRows: (title: string) => Locator;
    // readonly bookTitle: (title: string) => Locator;

    /**
     * Constructs a BookstorePage object
     * 
     * @param page, the Playwright driver
     */
    constructor(page: Page) {
        this.page = page;
        this.searchbar = page.getByRole('textbox', { name: 'Type to search' });
        this.resultRows = (title: string) => page.getByRole('row').filter({ hasText: title }); // Return all result rows
    }

    /**
     * Fills the searchbar with the given query
     * 
     * @param query to search
     */
    async fillSearchbar(query: string) {
        await this.searchbar.fill(query);
    }

    /**
     * Clears the searchbar
     */
    async clearSearchbar() {
        await this.searchbar.clear();
    }

    /**
     * Checks the number of results that contain the searched query
     * 
     * @param query to search
     * @param count to check for
     */
    async checkNumberOfSearchResults(query: string, count: number) {
        await expect(this.resultRows(query)).toHaveCount(count);
    }
}

export default BookstorePage;