const router = require('express').Router();

const courseService = require('../services/courseService.js')

const getCreateCourse = (req, res) => {
    res.render('courses/create');
}

const postCreateCourse = async (req, res) => {
    let { title, description, imageUrl, isPublic } = req.body;
    const owner = req.user._id;
    await courseService.createCourse(title, description, imageUrl, isPublic, owner);
    res.redirect('/')
}

getDetailsPage = async (req, res) => {

    const course = await courseService.getCourse(req.params.courseId);
    isOwner = req.user._id == course.owner;
    isLogged = course.enrolledUsers.some(x => x._id == req.user._id);
    
    res.render('courses/details', {course, isOwner, isLogged})
}

enrollUser = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;
    await courseService.addUser(courseId, userId);
    res.redirect(`/courses/${courseId}`);
}


router.get('/create', getCreateCourse);
router.post('/create', postCreateCourse);
router.get('/:courseId', getDetailsPage);
router.get('/:courseId/enroll', enrollUser)

module.exports = router;