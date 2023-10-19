const { Injectable } = require("../common/utils/AppDependency");
const { GuestFormRepository } = require("../repositories/GuestFormRepository");

class NoteGalleryService {
    /**
     * @private
     * @property {GuestFormRepository}
     */
    guestFormRepository;
    
    /**
     * @param {GuestFormRepository} guestFormRepository 
     */
    constructor(guestFormRepository) {
        this.guestFormRepository = guestFormRepository;
    }
}

Injectable(NoteGalleryService)([GuestFormRepository]);

module.exports = { NoteGalleryService };