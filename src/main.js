// @ts-check
require("reflect-metadata");
require("dotenv").config();
const { Container } = require("inversify");
const express = require("express");

const { App } = require("./App");
const { logger } = require("./common/logger/PinoLogger");
const { Database } = require("./infrastructure/mysql/Database");

(function () {
    const server = express();
    const container = new Container();

    /** @type {number | string} */
    const port = process.env.SERVER_PORT || 3000;

    new App(server)
        .setContainer(container)
        .setMiddlewares()
        .setRoutes()
        .listen(port);

    Database.authenticate()
        .then(() => logger.info(`Sequelize Connected to ${process.env.DB_NAME} Database`))
        .catch((error) => logger.error(error.message));
})();