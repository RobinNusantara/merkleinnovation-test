const { AdminController } = require("./AdminController");
const { AuthController }  = require("./AuthController");
const { GuestFormController } = require("./GuestFormController");
const { NoteGalleryController } = require("./NoteGalleryController");

const Controllers = [AdminController, AuthController, GuestFormController, NoteGalleryController];

module.exports = { Controllers };
