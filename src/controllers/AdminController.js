const { HttpController } = require("../common/http/HttpController");
const { Controller } = require("../common/utils/AppDependency");
const { authentication } = require("../middlewares/AuthenticationMiddleware");
const { UserService } = require("../services/UserService");
const { GuestFormService } = require("../services/GuestFormService");

class AdminController extends HttpController {
    /**
     * @private
     * @param {UserService}
     */
    userService;
    /**
     * @private
     * @param {GuestFormService}
     */
    guestFormService;
    
    /**
     * @param {import("express").Application} express
     * @param {UserService}                   userService 
     * @param {GuestFormService}              guestFormService
     */
    constructor(express, userService, guestFormService) {
        super(express);
        this.userService = userService;
        this.guestFormService = guestFormService;
    }

    setRoutes() {
        /** User Management */
        this.httpPost(
            "admin/users",
            authentication(),
            async (req, res, next) => {
            return await this.userService.insertUser({
                email: req.body["email"],
                username: req.body["username"],
                password: req.body["password"],
            });
        });
        
        this.httpGet(
            "admin/users", 
            authentication(), 
            async (req, res, next) => {
            const { page, limit, offset } = this.pagination(req.query.page, req.query.limit);

            const data = await this.userService.getUsersAndCount({
                limit,
                offset,
            });

            return this.paginate({
                page,
                limit,
                path: req.url,
                data: data.rows,
                totalItems: data.count,
            });
        });

        this.httpDelete(
            "admin/users",
            authentication(),
            async (req, res, next) => {
                return await this.userService.removeUser({
                    userId: req.body["userId"],
                });
        });

        /** Guest Form Managemet */
        this.httpGet(
            "admin/guest-forms",
            authentication(),
            async (req, res, next) => {
                const { page, limit, offset } = this.pagination(req.query.page, req.query.limit);

                const data = await this.guestFormService.getGuestFormsAndCount({
                    limit,
                    offset,
                    token: req.headers["token"],
                });

                return this.paginate({
                    page,
                    limit,
                    path: req.url,
                    data: data.rows,
                    totalItems: data.count,
                });
        });
    }
}

Controller(AdminController)([UserService, GuestFormService])

module.exports = { AdminController };
