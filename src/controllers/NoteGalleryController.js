const { HttpController } = require("../common/http/HttpController");
const { Controller } = require("../common/utils/AppDependency");
const { authentication } = require("../middlewares/AuthenticationMiddleware");
const { GuestFormService } = require("../services/GuestFormService");

class NoteGalleryController extends HttpController {
    /**
     * @private
     * @type {GuestFormService}
     */
    guestFormService;

    /**
     * @param {import("express").Application} express
     * @param {GuestFormService}              guestFormService 
     */
    constructor(express, guestFormService) {
        super(express)
        this.guestFormService = guestFormService;
    }

    setRoutes() {
        this.httpGet(
            "note-galleries", 
            authentication(), 
            async (req, res, next) => {
            const { page, limit, offset } = this.pagination(req.query.page, req.query.limit);

            const data = await this.guestFormService.getGuestFormsAndCount({
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

Controller(NoteGalleryController)([GuestFormService]);

module.exports = { NoteGalleryController };
