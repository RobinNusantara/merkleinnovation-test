// @ts-check
require("reflect-metadata");
require("dotenv").config();
const { Container } = require("inversify");
const express = require("express");

const { App } = require("./App");
const { logger } = require("./common/logger/PinoLogger");

(function () {
    const server = express();
    const container = new Container();

    /** @type {number | string} */
    const port = process.env.PORT || 3000;

    new App(server)
        .setContainer(container)
        .setMiddlewares()
        .setRoutes()
        .listen(port);
})();