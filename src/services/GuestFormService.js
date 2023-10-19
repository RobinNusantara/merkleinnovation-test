const { Injectable } = require("../common/utils/AppDependency");
const { GuestFormRepository } = require("../repositories/GuestFormRepository");

class GuestFormService {
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

Injectable(GuestFormService)([GuestFormRepository]);

module.exports = { GuestFormService }