const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRound = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator:  function(v) {
                return /[a-zA-Z1-9]+/g.test(v);
            },
            message: props => `${props.value} is not valid username!`
        },
        minLength: [5, 'Username must me equal or longer than 5 characters!'],
        required: [true, 'Username required']
    },
    password: {
        type: String,
        validate: {
            validator:  function(v) {
                return /[a-zA-Z1-9]+/g.test(v);
            },
            message: props => `${props.value} is not valid password!`
        },
        minLength: [5, 'Password must be equal or longer than 5 characters!'],
        required: true
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, saltRound)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
