const { GuestFormRepository } = require("./GuestFormRepository");
const { NoteGalleryRepository } = require("./NoteGalleryRepository");
const { UserRepository } = require("./UserRepository");

const Repositories = [UserRepository, GuestFormRepository, NoteGalleryRepository];

module.exports = { Repositories };
