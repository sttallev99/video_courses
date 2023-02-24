const router = require('express').Router();

const authService = require('../services/authService.js');

const getRegister = (req, res) => {
    res.render('auth/register');
}

const getLogin = (req, res) => {
    res.render('auth/login');
}

const postregister = async (req, res) => {
    let { username, password, repeatPassword } = req.body;

    if(password != repeatPassword) {
        res.send('Passwords missmatch');
        res.end();
    }

    try {
        await authService.register(username, password);
        res.redirect('/')
    } catch(err) {
        console.log(err);
        res.end();
    }
    res.end();
}

router.get('/register', getRegister);
router.post('/register', postregister);
router.get('/login', getLogin)


module.exports = router;