/** Dependencies */
const { Strategy, ExtractJwt } = require("passport-jwt");
const { Container } = require("inversify");
const { Op } = require("sequelize");

const { UserRepository } = require("../../repositories/UserRepository");
const UserTokenModel = require("../../models/UserTokenModel");

class PassportJwtStrategy extends Strategy {
    constructor() {
        super(
            {
                secretOrKey: process.env.SERVER_TOKEN,
                jwtFromRequest: ExtractJwt.fromHeader("token"),
                passReqToCallback: true,
            },
            /**
             * @typedef  {object} IPayload
             * @property {string} id
             * @property {string} email
             * @property {string} username
             * @property {number} iat
             *
             * @param {import("express").Request}               req
             * @param {IPayload}                                payload
             * @param {import("passport-jwt").VerifiedCallback} done
             */
            (req, payload, done) => {
                const container = new Container();
                container.bind(UserRepository.name).to(UserRepository);
                /** @type {UserRepository}  */
                const userRepository = container.get(UserRepository.name);

                userRepository
                    .findOne({
                        subQuery: false,
                        include: [
                            {
                                model: UserTokenModel,
                            }
                        ],
                        where: {
                            [Op.and]: [
                                {
                                    id: {
                                        [Op.eq]: payload.id,
                                    },
                                    ["$UserTokenModels.token$"]: {
                                        [Op.eq]: req.headers["token"],
                                    },
                                }
                            ],
                        },
                    })
                    .then((user) => {
                        if (!user) return done(null, false);

                        req.user = user;
                        return done(null, user);
                    })
                    .catch((error) => {
                        return done(error, false);
                    });
            },
        );
    }
}

module.exports = { PassportJwtStrategy };
