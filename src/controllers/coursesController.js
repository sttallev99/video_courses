const router = require('express').Router();

const courseService = require('../services/courseService.js')

const getCreateCourse = (req, res) => {
    res.render('courses/create');
}

const postCreateCourse = async (req, res) => {
    let { title, description, imageUrl, isPublic } = req.body;
    await courseService.createCourse(title, description, imageUrl, isPublic);
    res.redirect('/')
}

getDetailsPage = async (req, res) => {
    const course = await courseService.getCourse(req.params.courseId);
    res.render('courses/details', {...course})
}

router.get('/create', getCreateCourse);
router.post('/create', postCreateCourse);
router.get('/:courseId', getDetailsPage);

module.exports = router;