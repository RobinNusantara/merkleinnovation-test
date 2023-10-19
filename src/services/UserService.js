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

    /**
     * @public
     * @param {import("../dtos/Admin/QueryGetAdminUsersDto").QueryGetAdminUsersDto} query
     */
    async getUsersAndCount(query) {
        return await this.userRepository.findAndCountAll({
            limit: query.limit,
            offset: query.offset,
        });
    }
}

Injectable(UserService)([UserRepository]);

module.exports = { UserService };