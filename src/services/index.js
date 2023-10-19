const { GuestFormService } = require("./GuestFormService");
const { NoteGalleryService } = require("./NoteGalleryService");
const { UserService } = require("./UserService");

const Services = [UserService, GuestFormService, NoteGalleryService];

module.exports = { Services };
