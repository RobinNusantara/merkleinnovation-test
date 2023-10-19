/* eslint-disable no-unused-vars */
const { HttpError: HttpRequestError } = require("http-errors");
const { Response } = require("../common/http/HttpResponse");
const { HttpStatus } = require("../common/http/HttpStatus");
const { logger } = require("../common/logger/PinoLogger");

/**
 * Express
 *
 * @typedef {import("express").Application}  Application
 * @typedef {import("express").Request}      IRequest
 * @typedef {import("express").Response}     IResponse
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @typedef {import("celebrate").CelebrateError} CelebrateError
 */

class HttpError {
    /**
     * @param {any}          err
     * @param {IRequest}     req
     * @param {IResponse}    res
     * @param {NextFunction} next
     */
    static catch(err, req, res, next) {
        let status;
        let message;

        logger.error(err);

        if (err instanceof HttpRequestError) {
            status = err.statusCode;
            message = err.message;

        } else {
            status = HttpStatus.BadRequest;
            message = !err.message ? "Bad Request!" : err.message;
        }

        const response = new Response(false, status, {}, message);

        return res.status(status).json({
            success: response.success,
            status: response.status,
            data: response.data,
            message: response.message,
        });
    }
}

module.exports = { HttpError };