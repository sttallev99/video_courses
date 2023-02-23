const router = require('express').Router();

const getRegister = (req, res) => {
    res.render('auth/register');
}

router.get('/register', getRegister);


module.exports = router;