const { GuestFormRepository } = require("./GuestFormRepository");
const { UserRepository } = require("./UserRepository");
const { UserTokenRepository } = require("./UserTokenRepository");

const Repositories = [UserRepository, GuestFormRepository, UserTokenRepository];

module.exports = { Repositories };
