const router = require('express').Router();
const cookieParser = require('cookie-parser');

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
        res.cookie('authCookie', token, { httpOnly: true })
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
        const token = authService.login(username, password);
        res.redirect('/auth/login');
    }catch(err) {
        console.log(err)
    }
}


router.get('/register', getRegister);
router.post('/register', postregister);
router.get('/login', getLogin)
router.post('/login', postLogin);


module.exports = router;