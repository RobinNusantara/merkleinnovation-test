const { HttpController } = require("../common/http/HttpController");
const { GuestFormService } = require("../services/GuestFormService");

class GuestFormController extends HttpController {
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

    setRoutes() {}
}

module.exports = { GuestFormController }
