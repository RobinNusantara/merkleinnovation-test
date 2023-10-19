const { HttpController } = require("../common/http/HttpController");
const { Controller } = require("../common/utils/AppDependency");
const { UserService } = require("../services/UserService");
const { authentication } = require("../middlewares/AuthenticationMiddleware");

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

        this.httpDelete(
            "auth/signout", 
            authentication(), 
            async (req, res, next) => {
            return await this.userService.signOut({
                    userId: req.user["id"],
                    token: req.headers["token"],
                });
            }); 
    }
}

Controller(AuthController)([UserService]);

module.exports = { AuthController }
