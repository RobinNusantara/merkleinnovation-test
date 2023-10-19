const { Injectable } = require("../common/utils/AppDependency")

class UserRepository {}

Injectable(UserRepository);

module.exports = { UserRepository };