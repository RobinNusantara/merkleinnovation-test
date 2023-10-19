const { HttpController } = require("../common/http/HttpController");
const { Controller } = require("../common/utils/AppDependency");
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

    setRoutes() {
        this.httpPost("guest-forms", async (req, res, next) => {
            return await this.guestFormService.insertGuestForm({
                name: req.body["name"],
                phoneNumber: req.body["phoneNumber"],
                address: req.body["address"],
                notes: req.body["notes"],
            });
        })
    }
}

Controller(GuestFormController)([GuestFormService]);

module.exports = { GuestFormController }
