//@ts-check
/** Dependencies */
const { config } = require("dotenv");
const { decorate, injectable, inject } = require("inversify");

/** Enums */
const { HttpMethod } = require("./HttpMethod");
const { HttpStatus } = require("./HttpStatus");
const { Response } = require("./HttpResponse");

const { Pagination } = require("../pagination/Pagination");
const { Paginate } = require("../pagination/Paginate");

/**
 * Http Method
 * @typedef {import("./HttpMethod").IHttpMethod} IHttpMethod
 */

/**
 * Express
 * @typedef {import("express").Application}  Application
 * @typedef {import("express").Request}      IRequest
 * @typedef {import("express").Response}     IResponse
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @typedef  {object}             IPagination
 * @property {string}             path
 * @property {number}             page
 * @property {number}             limit
 * @property {number}             totalItems
 * @property {Record<string,any>} summary
 * @property {Record<string,any>} data
 */

/**
 * @callback IRequestOption
 * @param    {IRequest}     req
 * @param    {IResponse}    res
 * @param    {NextFunction} next
 */

config();

/**
 * @abstract
 */
class HttpController {
    /**
     * @protected
     * @readonly
     * @type {Application}
     */
    app;
    /**
     * @private
     * @readonly
     * @type {string}
     */
    hostname = process.env.SERVER_HOSTNAME || "localhost";

    /**
     * @param {Application} app
     */
    constructor(app) {
        if (new.target === HttpController) {
            const message = `Class "HttpController" cannot be instantiated!`;
            throw new TypeError(message);
        }

        this.app = app;
    }

    /**
     * @public
     */
    setRoutes() {
        const message = `Method "setRoutes()" must be implemented!`;
        throw new TypeError(message);
    }

    /**
     * @private
     * @param {IRequestOption} fn
     */
    handler(fn) {
        /**
         * @param {IRequest}     req
         * @param {IResponse}    res
         * @param {NextFunction} next
         */
        return async (req, res, next) => {
            try {
                const value = await fn(req, res, next);

                if (!value.message) {
                    return this.response(value, null)(req, res, next);
                } else {
                    return this.response(value.data, value.message)(
                        req,
                        res,
                        next,
                    );
                }
            } catch (error) {
                next(error);
            }
        };
    }

    /**
     * @private
     * @param {IHttpMethod}           method
     * @param {string}                path
     * @param {Array<IRequestOption>} handlers
     */
    request(method, path, ...handlers) {
        const fn = handlers.pop();

        const message = `Handler must be implemented!`;
        if (!fn) throw new TypeError(message);

        const middlewares = handlers;

        return this.app[method](
            `/v1/${path}`,
            ...middlewares,
            this.handler(fn),
        );
    }

    /**
     * **Accept Request With Http Get**
     * @example
        // Basic Usage
        this.httpGet("users", async (req, res, next) => {
            return await userService.getUsers();
        });
        // With Parameters
        this.httpGet("users/:id", (req, res, next) => {
            return await userService.getUser(req.params.id);
        });
        // With Queries
        this.httpGet("users", async (req, res, next) => {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const { data } = await userService.getUsers(
                page,
                limit,
            );
            return this.paginate({
                path: req.url,
                page,
                limit,
                data: data.rows,
                totalItems: data.count,
            });
        })
        // With Middleware
        this.httpGet(
            "users/:id",
            Validate.role("Admin"),
            (req, res, next) => {
                return await userService.getUser(req.params.id);
            },
        );
     * @protected
     * @param {string}                path
     * @param {Array<IRequestOption>} handlers
     */
    httpGet(path, ...handlers) {
        return this.request("get", path, ...handlers);
    }

    /**
     * **Accept Request With Http Post**
     * @example
        // Basic Usage
        this.httpPost("users", async (req, res, next) => {
            return await userService.insertUser(req.body);
        });
        // With Middleware
        this.httpPost(
            "users",
            Validate.role("Admin"),
            Validate.requestBody(CreateUserSchema),
            async (req, res, next) => {
                return await userService.insertUser(req.body);
            },
        );
     * @protected
     * @param {string}                path
     * @param {Array<IRequestOption>} handlers
     */
    httpPost(path, ...handlers) {
        return this.request("post", path, ...handlers);
    }

    /**
     * **Accept Request With Http Put**
     * @example
        // Basic Usage
        this.httpPut("users/:id", async (req, res, next) => {
            return await userService.updatetUser(
                req.params.id,
                req.body,
            );
        });
        // With Middleware
        this.httpPut(
            "users/:id",
            Validate.role("Admin"),
            Validate.requestBody(UpdateUserSchema),
            async (req, res, next) => {
                return await userService.updatetUser(
                    req.params.id
                    req.body,
                );
            },
        );
     * @protected
     * @param {string}                path
     * @param {Array<IRequestOption>} handlers
     */
    httpPut(path, ...handlers) {
        return this.request("put", path, ...handlers);
    }

    /**
     * **Accept Request With Http Patch**
     * @example
        // Basic Usage
        this.httpPatch("users/:id", async (req, res, next) => {
            return await userService.updatetUser(
                req.params.id,
                req.body,
            );
        });
        // With Middleware
        this.httpPatch(
            "users/:id",
            Validate.role("Admin"),
            Validate.requestBody(UpdateUserSchema),
            async (req, res, next) => {
                return await userService.updatetUser(
                    req.params.id
                    req.body,
                );
            },
        );
     * @protected
     * @param {string}                path
     * @param {Array<IRequestOption>} handlers
     */
    httpPatch(path, ...handlers) {
        return this.request("patch", path, ...handlers);
    }

    /**
     * **Accept Request With Http Delete**
     * @example
        // Basic Usage
        this.httpDelete("users/:id", async (req, res, next) => {
            return await userService.deleteUser(req.params.id);
        });
        // With Middleware
        this.httpDelete(
            "users/:id",
            Validate.role("Admin"),
            async (req, res, next) => {
                return await userService.deleteUser(req.params.id);
            },
        );
     * @protected
     * @param {string}                path
     * @param {Array<IRequestOption>} handlers
     */
    httpDelete(path, ...handlers) {
        return this.request("delete", path, ...handlers);
    }

    /**
     * @protected
     * @param {string} page
     * @param {string} limit
     */
    pagination(page, limit) {
        const pageValue = parseInt(page) || 1;
        const limitValue = parseInt(limit) || 10;

        return {
            page: pageValue,
            limit: limitValue,
            offset: (pageValue - 1) * limitValue,
        };
    }

    /**
     * @protected
     * @param {IPagination} args
     */
    paginate(args) {
        const { path, totalItems, data } = args;

        const page = args.page;
        const limit = args.limit;

        const totalPages = Math.ceil(totalItems / limit);
        const prevPage = page === 1 ? page : page - 1;
        const nextPage = page >= totalPages ? totalPages : page + 1;

        const link = this.hostname + path;

        const pagination = new Pagination(
            page,
            limit,
            totalItems,
            totalPages,
            `${link}?page=${prevPage}&limit=${limit}`,
            `${link}?page=${nextPage}&limit=${limit}`,
        );

        const paginate = new Paginate(pagination, data);

        if (args.summary) {
            return {
                pagination: {
                    pointer: {
                        before: prevPage.toString(),
                        after: paginate.pagination.page.toString(),
                    },
                    ["page"]: paginate.pagination.page,
                    ["limit"]: paginate.pagination.limit,
                    ["total_items"]: paginate.pagination.totalItems,
                    ["total_pages"]: paginate.pagination.totalPages,
                    ["next_link_page"]: paginate.pagination.nextLinkPage,
                    ["prev_link_page"]: paginate.pagination.prevLinkPage,
                },
                summary: args.summary,
                rows: paginate.rows,
            };
        }

        return {
            pagination: {
                pointer: {
                    before: prevPage.toString(),
                    after: paginate.pagination.page.toString(),
                },
                ["page"]: paginate.pagination.page,
                ["limit"]: paginate.pagination.limit,
                ["total_items"]: paginate.pagination.totalItems,
                ["total_pages"]: paginate.pagination.totalPages,
                ["next_link_page"]: paginate.pagination.nextLinkPage,
                ["prev_link_page"]: paginate.pagination.prevLinkPage,
            },
            rows: paginate.rows,
        };
    }

    /**
     * @private
     * @param {Record<string, any>} data
     * @param {string | null}       [msg]
     */
    response(data, msg) {
        /**
         * @param {IRequest}     req
         * @param {IResponse}    res
         * @param {NextFunction} next
         */
        // eslint-disable-next-line no-unused-vars
        return (req, res, next) => {
            const method = req.method;
            let status;
            let message;

            switch (method) {
                case HttpMethod.Get:
                    status = HttpStatus.Ok;
                    message = "Ok!";
                    break;
                case HttpMethod.Post:
                    status = HttpStatus.Created;
                    message = "Created!";
                    break;
                case HttpMethod.Put:
                case HttpMethod.Patch:
                    status = HttpStatus.Ok;
                    message = "Updated!";
                    break;
                case HttpMethod.Delete:
                    status = HttpStatus.NoContent;
                    message = "Removed!";
                    break;
                default:
                    throw new Error("Method not allowed!");
            }

            const response = new Response(true, status, data, msg || message);

            return res.status(status).json({
                success: response.success,
                status: response.status,
                data: response.data,
                message: response.message,
            });
        };
    }
}

decorate(injectable(), HttpController);
decorate(inject("Express"), HttpController, 0);

module.exports = { HttpController };