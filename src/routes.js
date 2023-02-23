const router = require('express').Router();

const authController = require('./controllers/authController.js');
const homeController = require('./controllers/homeController.js');

router.use('/auth', authController);
router.use(homeController);

module.exports = router;