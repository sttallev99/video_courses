const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User.js');
const { signPromisify } = require('../utils/jwtUtils.js');


const register = (username, password) => User.create({username, password});

const login = async (username, password) => {

        const user = await User.findOne({username});

        console.log(user);

        if(user) {     
            const isValid = await bcrypt.compare(password, user.password);
            
            if(isValid) {
                let payload = {
                    _id: user._id,
                    username: username
                }
                return await signPromisify(payload, process.env.SECRET);
            } else {
                throw new Error('Invalid username or password');
            }
        } else {
            throw new Error('Invalid username or passwrd');
        }
}

const authService = {
    register,
    login
}

module.exports = authService;