const express = require('express');
require('dotenv').config();

const {databaseConfig} = require('./config/DBConfig.js');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
    res.end();
});

databaseConfig()
    .then(() => console.log('DB CONNECTED!'))
    .then(() => app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`)))
    .catch(err => console.log(err))