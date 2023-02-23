const router = require('express').Router();

const getHome = (req, res) => {
    res.render('home');
}

router.get('/', getHome);

module.exports = router;