const router = require('express').Router();
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authService = require('../services/authService.js');

const getRegister = (req, res) => {
    res.render('auth/register');
}

const postregister = async (req, res) => {
    let { username, password, repeatPassword } = req.body;

    if(password != repeatPassword) {
        res.send('Passwords missmatch');
        res.end();
    }

    try {
        await authService.register(username, password);
        const token = await authService.login(username, password);
        res.cookie(process.env.AUTH_COOKIE_NAME, token, { httpOnly: true })
        res.redirect('/')
    } catch(err) {
        console.log(err);
        res.end();
    }
    res.end();
}

const getLogin = (req, res) => {
    res.render('auth/login');
}

const postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
    
        res.cookie(process.env.AUTH_COOKIE_NAME, token, { httpOnly: true })
        res.redirect('/');
    }catch(err) {
        console.log(err);
        res.redirect('/auth/login');
    }
}

getLogout = (req, res) => {
    res.clearCookie(process.env.AUTH_COOKIE_NAME);
    res.redirect('/auth/login')
}

function isLoggin(req, res, next) {
    if(req.user) {
        res.redirect('/');
    } else {
        next();
    }
}


router.get('/register', isLoggin, getRegister);
router.post('/register', isLoggin, postregister);
router.get('/login', isLoggin, getLogin)
router.post('/login', isLoggin, postLogin);
router.get('/logout', getLogout);


module.exports = router;