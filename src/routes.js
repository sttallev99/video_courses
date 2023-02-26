const router = require('express').Router();

const authController = require('./controllers/authController.js');
const homeController = require('./controllers/homeController.js');
const coursesController = require('./controllers/coursesController.js');

router.use(homeController);
router.use('/auth', authController);
router.use('/courses', coursesController)

module.exports = router;