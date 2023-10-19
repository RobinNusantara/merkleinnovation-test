const { SequelizeRepository } = require("../common/repository/SequelizeRepository");
const { Injectable } = require("../common/utils/AppDependency")
const UserModel = require("../models/UserModel");

class UserRepository extends SequelizeRepository {
    constructor() {
        super(UserModel);
    }
}

Injectable(UserRepository);

module.exports = { UserRepository };