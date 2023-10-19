const bcrypt = require("bcrypt");
const { Conflict, NotFound, Unauthorized } = require("http-errors");
const { sign } = require("jsonwebtoken");
const { randomUUID } = require("node:crypto");
const { Op } = require("sequelize");

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
        
        const payload = this.mapUser(user);
        const token = sign(payload, process.env.SERVER_TOKEN);

        return Object.assign(payload, { token });
    }
    

    /**
     * @public
     * @param {import("../dtos/Admin/QueryGetAdminUsersDto").QueryGetAdminUsersDto} query
     */
    async getUsersAndCount(query) {
        const data = await this.userRepository.findAndCountAll({
            limit: query.limit,
            offset: query.offset,
        });

        return {
            count: data?.count || 0,
            rows: !data?.rows ? [] : data.rows.map((user) => this.mapUser(user)),
        };
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
     * @param {Pick<import("../models/UserModel").IUserModel, "id" | "email" | "username">} user 
     */
    mapUser(user) {
        return {
            id: user.getDataValue("id"),
            email: user.getDataValue("email"),
            username: user.getDataValue("username"),
        };
    }
}

Injectable(UserService)([UserRepository]);

module.exports = { UserService };