const express = require('express');
require('dotenv').config();
const path = require('path');

const {databaseConfig} = require('./config/DBConfig.js');
const hbsConfig = require('./config/hbsConfig.js');

const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public')));
hbsConfig(app);

app.get('/', (req, res) => {
    res.render('home');
    console.log(path.resolve(__dirname, './public'))
});

databaseConfig()
    .then(() => console.log('DB CONNECTED!'))
    .then(() => app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`)))
    .catch(err => console.log(err))