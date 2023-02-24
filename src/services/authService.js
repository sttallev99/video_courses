const User = require('../models/User.js');

const register = (username, password) => User.create({username, password});

const authService = {
    register
}

module.exports = authService;