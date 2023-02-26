const router = require('express').Router();

const getCreateCourse = (req, res) => {
    res.render('courses/create');
}

router.get('/create', getCreateCourse);

module.exports = router;