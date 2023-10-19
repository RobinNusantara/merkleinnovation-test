const { Injectable } = require("../common/utils/AppDependency");
const { AuthRepository } = require("../repositories/AuthRepository");

class AuthService {
    /**
     * @private
     * @property {AuthRepository}
     */
    authRepository;
    
    /**
     * @param {AuthRepository} authRepository 
     */
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
}

Injectable(AuthService)([AuthRepository]);

module.exports = { AuthService }