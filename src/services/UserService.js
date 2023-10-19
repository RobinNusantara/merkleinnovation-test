const bcrypt = require('bcrypt');
const { randomUUID } = require("node:crypto");
const { Op } = require("sequelize");
const { Conflict } = require("http-errors");
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
     * @param {import("../dtos/Admin/InsertAdminUserDto").InsertAdminUserDto} body
     */
    async insertUser(body) {
        const user = await this.userRepository.findOne({
            where: {
                email: {
                    [Op.eq]: body.email,
                },
            }, 
        });

        if (user) throw Conflict("User already exists!");

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(body.password, salt);

        return await this.userRepository.create({
            id: randomUUID(),
            email: body.email,
            username: body.username,
            password,
        });
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