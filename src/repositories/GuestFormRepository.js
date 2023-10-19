const { SequelizeRepository } = require("../common/repository/SequelizeRepository");
const { Injectable } = require("../common/utils/AppDependency")
const GuestFormModel = require("../models/GuestFormModel");

class GuestFormRepository extends SequelizeRepository {
    constructor() {
        super(GuestFormModel)
    }
}

Injectable(GuestFormRepository);

module.exports = { GuestFormRepository };