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
        this.httpPost("auth/signin", async (req, res, next) => {
            return await this.userService.signIn({
                email: req.body["email"],
                password: req.body["password"],
            });
        });
    }
}

Controller(AuthController)([UserService]);

module.exports = { AuthController }
