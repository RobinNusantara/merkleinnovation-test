const { HttpController } = require("../common/http/HttpController");
const { Controller } = require("../common/utils/AppDependency");
const { UserService } = require("../services/UserService");

class AdminController extends HttpController {
    /**
     * @private
     * @param {UserService}
     */
    userService;
    
    /**
     * @param {import("express").Application} express
     * @param {UserService}                   userService 
     */
    constructor(express, userService) {
        super(express);
        this.userService = userService;
    }

    setRoutes() {
        this.httpGet("admin/users", async (req, res, next) => {
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
    }
}

Controller(AdminController)([UserService])

module.exports = { AdminController };
