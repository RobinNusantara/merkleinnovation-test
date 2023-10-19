//@ts-check
/**
 * @typedef  {object}              IResponse
 * @property {boolean}             success
 * @property {number}              status
 * @property {Record<string, any>} data
 * @property {string}              message
 */

class Response {
    /**
     * @private
     * @type {boolean}
     */
    _success;
    /**
     * @private
     * @type {number}
     */
    _status;
    /**
     * @private
     * @type {Record<string, any>}
     */
    _data;
    /**
     * @private
     * @type {string}
     */
    _message;

    /**
     * @param {boolean}             success
     * @param {number}              status
     * @param {Record<string, any>} data
     * @param {string}              message
     */
    constructor(success, status, data, message) {
        this._success = success;
        this._status = status;
        this._data = data;
        this._message = message;
    }

    get success() {
        return this._success;
    }

    get status() {
        return this._status;
    }

    get data() {
        return this._data;
    }

    get message() {
        return this._message;
    }
}

module.exports = { Response };