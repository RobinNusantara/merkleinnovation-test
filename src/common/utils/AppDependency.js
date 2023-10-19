const { decorate, injectable, inject } = require("inversify");
const { Express } = require("../symbols/Express");
const { logger } = require("../logger/PinoLogger");

/**
 * @param {Function} target
 */
function Controller(target) {
    decorate(injectable(), target);
    /**
     * @param {Array<Function>} modules
     */
    return function (modules) {
        try {
            decorate(inject(Express.description), target, 0);

            modules.forEach((module, index) => {
                decorate(inject(module.name), target, index + 1);
            });
        } catch (error) {
            logger.error(error.message);
        }
    };
}

/**
 * @param {Function} target
 */
function Injectable(target) {
    decorate(injectable(), target);
    /**
     * @param {Array<Function>} modules
     */
    return function (modules) {
        try {
            modules.forEach((module, index) => {
                decorate(inject(module.name), target, index);
            });
        } catch (error) {
            logger.error(error.message);
        }
    };
}

module.exports = { Controller, Injectable };