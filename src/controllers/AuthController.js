const { HttpController } = require("../common/http/HttpController");
const { Controller } = require("../common/utils/AppDependency");
const { UserService } = require("../services/UserService");

class AuthController extends HttpController {
    /**
     * @private
     * @type {UserService}
     */
    userService;

    /**
     * @param {import("express").Application} express
     * @param {UserService}                   userService 
     */
    constructor(express, userService) {
        super(express)
        this.userService = userService;
    }

    setRoutes() {
        this.httpGet("auth/signin", async (req, res, next) => {
            return 1;
        });
    }
}

Controller(AuthController)([UserService]);

module.exports = { AuthController }
