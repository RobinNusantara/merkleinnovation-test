/** Dependency */
const express = require("express");
const passport = require("passport");
const { ContainerModule } = require("inversify");

/** Common */
const { logger, pino } = require("./common/logger/PinoLogger");
const { Express } = require("./common/symbols/Express");

/** Middleware */
const { cors } = require("./middlewares/CorsMiddleware");
const { HttpError } = require("./middlewares/HttpErrorMiddleware");

/** Application */
const { Controllers } = require("./controllers");
const { Services } = require("./services");
const { Repositories } = require("./repositories");

class App {
    /**
     * @private
     * @type {import("inversify").Container}
     */
    container;
    /**
     * @private
     * @readonly
     * @type {import("express").Express}
     */
    app;
    /**
     * @private
     * @readonly
     * @type {import("pino").Logger}
     */
    logger;

    /**
     * @param {import("express").Express} app
     */
    constructor(app) {
        this.app = app;
        this.logger = logger;
    }

    /**
     * @public
     */
    setMiddlewares() {
        this.app.use(cors);
        this.app.use(pino);
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(passport.initialize());

        return this;
    }

    /**
     * @public
     * @param {import("inversify").Container} container
     */
    setContainer(container) {
        this.container = container;
    
        const modules = new ContainerModule((bind) => {
            [Controllers, Services, Repositories]
                .flat()
                .forEach((module) => bind(module.name).to(module));
            });
    
            container.bind(Express.description).toDynamicValue(() => this.app);
            container.load(modules);
    
        return this;
    }

    /**
     * @public
     */
    setRoutes() {
        Controllers.forEach((module) => {
            const controller = this.container.get(module.name);
            controller.setRoutes();
        });
    
        return this;
    }

    /**
     * @public
     */
    setErrors() {
        this.app.use(HttpError.catch);
    
        return this;
    }
    

    /**
     * @public
     * @param {number | string} port
     */
    listen(port) {
        this.app.listen(port, () => {
            this.logger.info(`Server ${process.env.SERVER_STATUS}`);
            this.logger.info(`Listening on port ${port}`);
        });
    
        return this;
    }
}

module.exports = { App };
