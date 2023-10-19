const bcrypt = require("bcrypt");
const { Conflict, NotFound, Unauthorized } = require("http-errors");
const { sign } = require("jsonwebtoken");
const { randomUUID } = require("node:crypto");
const { Op } = require("sequelize");

const { Injectable } = require("../common/utils/AppDependency");
const { UserRepository } = require("../repositories/UserRepository");
const { UserTokenRepository } = require("../repositories/UserTokenRepository");
const { Database } = require("../infrastructure/mysql/Database");

class UserService {
    /**
     * @private
     * @property {UserRepository}
     */
    userRepository;
    /**
     * @private
     * @property {UserTokenRepository}
     */
    userTokenRepository;
    
    /**
     * @param {UserRepository}      userRepository 
     * @param {UserTokenRepository} userTokenRepository
     */
    constructor(userRepository, userTokenRepository) {
        this.userRepository = userRepository;
        this.userTokenRepository = userTokenRepository;
    }

    /**
     * @param {import("../dtos/Admin/InsertAdminUserDto").InsertAdminUserDto} body
     */
    async insertUser(body) {
        const [isEmailTaken, isUsernameTaken] = await Promise.all([
            this.userRepository.findOne({
                where: {
                    email: {
                        [Op.eq]: body.email,
                    },
                },
            }),
            this.userRepository.findOne({
                where: {
                    username: {
                        [Op.eq]: body.username,
                    },
                },
            }),
        ]);

        if (isEmailTaken) throw new Conflict("Email already taken!");

        if (isUsernameTaken) throw new Conflict("Username already taken!");

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
     * @param {import("../dtos/Admin/RemoveAdminUserDto").RemoveAdminUserDto} body
     */
    async removeUser(body) {
        const isUserExists = await this.userRepository.findOne({
            where: {
                id: {
                    [Op.eq]: body.userId,
                },
            },
        });

        if (!isUserExists) throw new NotFound("User not found!");

        return await Database.transaction(async (transaction) => {
            await this.userTokenRepository.delete({
                where: {
                    userId: {
                        [Op.eq]: body.userId,
                    }
                },
                transaction,
            });

            return await this.userRepository.delete({
                where: {
                    id: {
                        [Op.eq]: body.userId,
                    },
                },
                transaction,
            });

        });
    }

    /**
     * @param {import("../dtos/SignIn/SignInDto").SignInDto} body
     */
    async signIn(body) {
        const user = await this.userRepository.findOne({
            where: {
                username: {
                    [Op.eq]: body.username,
                },
            },
        });

        if (!user) throw new NotFound("Wrong Username!");

        const password = await bcrypt.compare(body.password, user.password);

        if (!password) throw new Unauthorized("Wrong password!");
        
        const payload = this.mapUser(user);
        const token = sign(payload, process.env.SERVER_TOKEN);

        await this.userTokenRepository.create({
            id: randomUUID(),
            userId: user.getDataValue("id"),
            token,
        })

        return Object.assign(payload, { token });
    }

    /**
     * @param {import("../dtos/SignOut/SignOutDto").SignOutDto} body
     */
    async signOut(body) {
        return await this.userTokenRepository.delete({
            where: {
                [Op.and]: [
                    {
                        userId: {
                            [Op.eq]: body.userId,
                        },
                        token: {
                            [Op.eq]: body.token,
                        },
                    }
                ],
            },
        });
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

Injectable(UserService)([UserRepository, UserTokenRepository]);

module.exports = { UserService };