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

    /**
     * @public
     * @param {import("../dtos/GuestForm/InsertGuestFormDto").InsertGuestFormDto} body
     */
    async insertGuestForm(body) {
        return await this.guestFormRepository.create({
            name: body.name,
            address: body.address,
            phoneNumber: body.phoneNumber,
            notes: body.notes,
        });
    }

    /**
     * @public
     * @param {import("../dtos/GuestForm/QueryGetGuestFormsDto").QueryGetGuestFormDto} query
     */
    async getGuestFormsAndCount(query) {
        const options = {
            limit: query.limit,
            offset: query.offset,
        };

        if (!query?.token) {
            Object.assign(options, {
                attributes: ["id", "name", "notes"]
            })
        }

        return await this.guestFormRepository.findAndCountAll(options);
    }
}

Injectable(GuestFormService)([GuestFormRepository]);

module.exports = { GuestFormService };