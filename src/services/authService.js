const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User.js');
const { signPromisify } = require('../utils/jwtUtils.js');


const register = (username, password) => User.create({username, password});

const login = async (username, password) => {
    try{
        const user = await User.findOne({username});

        if(user) {

            let payload = {
                _id: user._id,
                username: username
            }

            const token = await bcrypt.compare(password, user.password)
                .then(() => {
                    return signPromisify(payload, process.env.SECRET);
                });
            
            return token
        } else {
            return;
        }

    }catch(err) {
        console.log(err);
    }
}

const authService = {
    register,
    login
}

module.exports = authService;