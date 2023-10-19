/* eslint-disable no-unused-vars */
const { randomUUID } = require("node:crypto");
const pino = require("pino");

/** @type {import("pino-http").HttpLogger} */
const logger = require("pino-http")({
    logger: pino({
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
            },
        },
    }),
    genReqId: (req, res) => {
        if (req.id) return req.id;

        let id = req.get("X-Request-Id");

        if (id) return id;

        id = randomUUID();
        res.header("X-Request-Id", id);

        return id;
    },
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
    },
    wrapSerializers: true,
    customLogLevel: function (req, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return "warn";
        } else if (res.statusCode >= 500 || err) {
            return "error";
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return "silent";
        }

        return "info";
    },
    customReceivedMessage: function (req, res) {
        return `${req.method} - ${req.path} | Request Received`;
    },
    customSuccessMessage: function (req, res) {
        if (res.statusCode === 404) return "Resource Not Found!";

        return `${req.method} - ${req.path} - ${res.statusCode} | Request Completed`;
    },
    customErrorMessage: function (req, res, err) {
        return `${req.method} - ${req.path} - ${res.statusCode} | Request Received`;
    },
    customAttributeKeys: {
        req: "request",
        res: "response",
        err: "error",
        responseTime: "timeTaken",
    },
    customProps: function (req, res) {
        return {
            customProp: req.customProp,
            customProp2: res.locals.myCustomData,
        };
    },
});

module.exports = { pino: logger, logger: logger.logger };