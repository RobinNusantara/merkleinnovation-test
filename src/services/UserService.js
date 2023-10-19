const { Injectable } = require("../common/utils/AppDependency");
const { UserRepository } = require("../repositories/UserRepository");

class UserService {
    /**
     * @private
     * @property {UserRepository}
     */
    userRepository;
    
    /**
     * @param {UserRepository} userRepository 
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
}

Injectable(UserService)([UserRepository]);

module.exports = { UserService };