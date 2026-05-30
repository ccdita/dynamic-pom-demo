import { test } from '../fixtures/bookstore-fixture';

test.describe('Book Search - Fixture', () => {
    
    test('Enter query that produces 1 result', async ({ page, bookstorePage }) => {
        const query = 'You Don\'t Know JS';
        await bookstorePage.fillSearchbar(query);
        await bookstorePage.checkNumberOfSearchResults(query, 1);
    });

    test('Enter query that produces multiple results', async ({ page, bookstorePage }) => {
        const query = 'java';
        await bookstorePage.fillSearchbar(query);
        await bookstorePage.checkNumberOfSearchResults(query, 4);
    });

    test('Enter query that produces no results', async ({ page, bookstorePage }) => {
        const query = 'playwright';
        await bookstorePage.fillSearchbar(query);
        await bookstorePage.checkNumberOfSearchResults(query, 0);
    });
});