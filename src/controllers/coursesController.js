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
    isOwner = req.user?._id == course.owner;
    isLogged = course.enrolledUsers.some(x => x._id == req.user?._id);
    const user = req.user;

    res.render('courses/details', {course, isOwner, isLogged, user})
}

enrollUser = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;
    await courseService.addUser(courseId, userId);

    res.redirect(`/courses/${courseId}`);
}

getEditCourse = async (req, res) => {
    const course = await courseService.getCourse(req.params.courseId);

    res.render('courses/edit', {course})
}

postEditCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const newData = req.body;

    await courseService.editCourse(courseId, newData);
    
    res.redirect(`/courses/${courseId}`);
}

getDeleteCourse = async (req, res) => {
    await courseService.deleteCourse(req.params.courseId);
    
    res.redirect('/');
}

function isNotLogin(req, res, next) {
    if(!req.user) {
        res.redirect('/auth/login');
    }else {
        next();
    }
}


router.get('/create',isNotLogin, getCreateCourse);
router.post('/create',isNotLogin, postCreateCourse);
router.get('/:courseId', getDetailsPage);
router.get('/:courseId/enroll',isNotLogin, enrollUser);
router.get('/:courseId/edit',isNotLogin, getEditCourse);
router.post('/:courseId/edit',isNotLogin, postEditCourse);
router.get('/:courseId/delete',isNotLogin, getDeleteCourse)

module.exports = router;