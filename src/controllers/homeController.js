const router = require('express').Router();

const courseService = require('../services/courseService.js');

const getHome = async (req, res) => {

    const courses =  await courseService.getAllPublicCourses()
    res.render('home', { courses });
}

router.get('/', getHome);

module.exports = router;