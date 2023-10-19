const { HttpController } = require("../common/http/HttpController");
const { Controller } = require("../common/utils/AppDependency");
const { AuthService } = require("../services/AuthService");

class AuthController extends HttpController {
    /**
     * @private
     * @type {AuthService}
     */
    authService;

    /**
     * @param {import("express").Application} express
     * @param {AuthService}                   authService 
     */
    constructor(express, authService) {
        super(express)
        this.authService = authService;
    }

    setRoutes() {
        this.httpGet("auth/signin", async (req, res, next) => {
            return 1;
        });
    }
}

Controller(AuthController)([AuthService]);

module.exports = { AuthController }
