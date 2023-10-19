const { SequelizeRepository } = require("../common/repository/SequelizeRepository");
const { Injectable } = require("../common/utils/AppDependency")
const GuestFormModel = require("../models/GuestFormModel");

/** @typedef {import("../models/GuestFormModel").IGuestFormModel} IGuestFormModel */

/** @extends {SequelizeRepository<GuestFormModel, IGuestFormModel>} */
class GuestFormRepository extends SequelizeRepository {
    constructor() {
        super(GuestFormModel)
    }
}

Injectable(GuestFormRepository);

module.exports = { GuestFormRepository };