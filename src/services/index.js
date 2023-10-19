const { GuestFormRepository } = require("../repositories/GuestFormRepository");
const { NoteGalleryRepository } = require("../repositories/NoteGalleryRepository");
const { UserService } = require("./UserService");

const Services = [UserService, GuestFormRepository, NoteGalleryRepository];

module.exports = { Services };
