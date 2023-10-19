const { AuthController }  = require("./AuthController");
const { GuestFormController } = require("./GuestFormController");

const Controllers = [AuthController, GuestFormController];

module.exports = { Controllers };
