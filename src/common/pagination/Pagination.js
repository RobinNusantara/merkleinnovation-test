//@ts-check
class Pagination {
    /**
     * @private
     * @type {number}
     */
    _page;
    /**
     * @private
     * @type {number}
     */
    _limit;
    /**
     * @private
     * @type {number}
     */
    _totalItems;
    /**
     * @private
     * @type {number}
     */
    _totalPages;
    /**
     * @private
     * @type {string}
     */
    _nextLinkPage;
    /**
     * @private
     * @type {string}
     */
    _prevLinkPage;

    /**
     * @param {number} page
     * @param {number} limit
     * @param {number} totalItems
     * @param {number} totalPages
     * @param {string} nextLinkPage
     * @param {string} prevLinkPage
     */
    constructor(
        page,
        limit,
        totalItems,
        totalPages,
        nextLinkPage,
        prevLinkPage,
    ) {
        this._page = page;
        this._limit = limit;
        this._totalItems = totalItems;
        this._totalPages = totalPages;
        this._nextLinkPage = nextLinkPage;
        this._prevLinkPage = prevLinkPage;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }

    get totalItems() {
        return this._totalItems;
    }

    get totalPages() {
        return this._totalPages;
    }

    get nextLinkPage() {
        return this._nextLinkPage;
    }

    get prevLinkPage() {
        return this._prevLinkPage;
    }
}

module.exports = { Pagination };