const bcrypt = require('bcrypt');
const { randomUUID } = require("node:crypto");
const { Op } = require("sequelize");
const { Conflict, NotFound, Unauthorized } = require("http-errors");
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
        const isUserExists = await this.getUserByEmail(body.email);

        if (isUserExists) throw Conflict("User already exists!");

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(body.password, salt);

        const user = await this.userRepository.create({
            id: randomUUID(),
            email: body.email,
            username: body.username,
            password,
        });

        return this.mapUser(user);
    }

    /**
     * @param {import("../dtos/SignIn/SignInDto").SignInDto} body
     */
    async signIn(body) {
        const user = await this.getUserByEmail(body.email);

        if (!user) throw new NotFound("No user found with that email!");

        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        if (!isPasswordValid) throw new Unauthorized("Wrong password!");

        return this.mapUser(user);
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


    /**
     * @private
     * @param {string} email
     */
    async getUserByEmail(email) {
        return await this.userRepository.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            }, 
        });
    }

    /**
     * @private
     * @param {import("../models/UserModel")} user 
     */
    async mapUser(user) {
        return {
            id: user.getDataValue("id"),
            email: user.getDataValue("email"),
            username: user.getDataValue("username"),
        };
    }
}

Injectable(UserService)([UserRepository]);

module.exports = { UserService };