const router = require('express').Router();

const getRegister = (req, res) => {
    res.render('auth/register');
}

const getLogin = (req, res) => {
    res.render('auth/login');
}

const postregister = (req, res) => {

}

router.get('/register', getRegister);
router.get('/login', getLogin)


module.exports = router;