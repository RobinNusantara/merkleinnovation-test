//@ts-check
// eslint-disable-next-line no-unused-vars
const { Pagination } = require("./Pagination");

class Paginate {
    /**
     * @private
     * @type {Pagination}
     */
    _pagination;
    /**
     * @private
     * @type {Record<string, any>}
     */
    _rows;

    /**
     * @param {Pagination}          pagination
     * @param {Record<string, any>} rows
     */
    constructor(pagination, rows) {
        this._pagination = pagination;
        this._rows = rows;
    }

    get pagination() {
        return this._pagination;
    }

    get rows() {
        return this._rows;
    }
}

module.exports = { Paginate };