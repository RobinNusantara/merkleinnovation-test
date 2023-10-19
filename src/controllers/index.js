const { AuthController }  = require("./AuthController");
const { GuestFormController } = require("./GuestFormController");
const { NoteGalleryController } = require("./NoteGalleryController");

const Controllers = [AuthController, GuestFormController, NoteGalleryController];

module.exports = { Controllers };
