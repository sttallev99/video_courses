const router = require('express').Router();
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authService = require('../services/authService.js');

const getRegister = (req, res) => {
    res.render('auth/register');
}

const postregister = async (req, res, next) => {
    let { username, password, repeatPassword } = req.body;
    // try {
    // } catch(err) {
    //     res.status(425);
    //     res.render('auth/register', { error: err.message });
    // }
    
    try {
        if(password != repeatPassword) {
            throw new Error('Password missmatch!');
        }
        
        await authService.register(username, password);
        const token = await authService.login(username, password);
        res.cookie(process.env.AUTH_COOKIE_NAME, token, { httpOnly: true })
        res.redirect('/')
    } catch(err) {
        const error = getErrorMessage(err);

        res.render('auth/register', { error });
    }
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

function getErrorMessage(err) {
    if(err.message != 'Password missmatch!') {
        let errorNames = Object.keys(err.errors);
        return err.errors[errorNames[0]].properties.message;
    } else {
        return err.message
    }
    // if(Object.keys(err.errors) === undefined) {
    //     return err.message
    // } else {
    // }
}


router.get('/register', isLoggin, getRegister);
router.post('/register', isLoggin, postregister);
router.get('/login', isLoggin, getLogin)
router.post('/login', isLoggin, postLogin);
router.get('/logout', getLogout);


module.exports = router;