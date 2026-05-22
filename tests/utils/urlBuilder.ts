/**
 * Builds a URL for a given page with optional search parameters
 * 
 * @param page, The page to build the URL for
 * @param params, Optional parameters to include in the URL
 * @returns The constructed URL
 */
export function buildUrl(page: string, params?: Record<any, any>) {
    const qParams = new URLSearchParams(params); // Get the search parameters
    /**
     * If search parameters exist, concatenate them as a query string to the page path
     * For this application specifically, the pages are unaffected by nonexistent search params
     * The use of search params in urlBuilder is solely for learning purposes
     */
    const url = params
    ? `${page.concat('?')}${qParams.toString()}`
    : page; // Otherwise, just use the page path
    return url;
}