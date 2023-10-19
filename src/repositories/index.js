const { GuestFormRepository } = require("./GuestFormRepository");
const { UserRepository } = require("./UserRepository");

const Repositories = [UserRepository, GuestFormRepository];

module.exports = { Repositories };
