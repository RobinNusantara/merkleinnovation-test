const { HttpController } = require("../common/http/HttpController");
const { Controller } = require("../common/utils/AppDependency");
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
        this.httpGet("note-galleries", async (req, res, next) => {
            const { page, limit } = this.pagination(req.query.page, req.query.limit);

            const data = await this.guestFormService.getGuestForms({
                page,
                limit,
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
