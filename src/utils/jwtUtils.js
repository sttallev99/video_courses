const jsonWebToken = require('jsonwebtoken');
const util = require('util');

exports.signPromisify = util.promisify(jsonWebToken.sign);
exports.verifyPromisify = util.promisify(jsonWebToken.verify);