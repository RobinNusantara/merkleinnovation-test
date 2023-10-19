const { SequelizeRepository } = require("../common/repository/SequelizeRepository");
const { Injectable } = require("../common/utils/AppDependency")
const UserTokenModel = require("../models/UserTokenModel");

/** @typedef {import("../models/UserTokenModel").IUserTokenModel} IUserTokenModel */

/** @extends {SequelizeRepository<UserTokenModel, IUserTokenModel>} */
class UserTokenRepository extends SequelizeRepository {
    constructor() {
        super(UserTokenModel);
    }
}

Injectable(UserTokenRepository);

module.exports = { UserTokenRepository };