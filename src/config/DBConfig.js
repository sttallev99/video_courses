const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

exports.databaseConfig = () => {
    return mongoose.connect(process.env.DATABASE_CONNECT_STRING);
}