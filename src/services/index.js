const { GuestFormRepository } = require("../repositories/GuestFormRepository");
const { UserService } = require("./UserService");

const Services = [UserService, GuestFormRepository];

module.exports = { Services };
