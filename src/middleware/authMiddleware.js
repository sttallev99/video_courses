require('dotenv').config();
const { verifyPromisify } = require('../utils/jwtUtils.js')

exports.auth = function(req, res, next) {
    const token = req.cookies[process.env.AUTH_COOKIE_NAME];

    if(token) {
        verifyPromisify(token, process.env.SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                res.locals.user = decodedToken;
                next();
            }).catch(err => {
                res.clearCookie(process.env.AUTH_COOKIE_NAME);

                res.redirect('/auth/login');
            })
    } else {
        next();
    }
}