const Controller = require("../libs/Controller");
const userService = require("../services/user-service");

const userController = {
    registration(req, res) {
        return new Controller({
            request: req,
            response: res,
            service: userService.registration,
        }).connect();
    },
    login(req, res) {
        return new Controller({
            request: req,
            response: res,
            service: userService.login,
        }).connect();
    },
    getProfile(req, res) {
        return new Controller({
            request: req,
            response: res,
            service: userService.getProfile,
        }).connect();
    },
    updateProfile(req, res) {
        return new Controller({
            request: req,
            response: res,
            service: userService.updateProfile,
        }).connect();
    },
    deleteProfile(req, res) {
        return new Controller({
            request: req,
            response: res,
            service: userService.deleteProfile,
        }).connect();
    },
    updateTokens(req, res) {
        return new Controller({
            request: req,
            response: res,
            service: userService.updateTokens,
        }).connect();
    }
};

module.exports = userController;