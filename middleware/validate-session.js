const jwt = require('jsonwebtoken');
const User = require('../models/users.models');

const validateSessions = async(req, res, next) => {

        const token = req.headers.authorization;

        const decoded = await jwt.verify(token, process.env.JWT);
        console.log(decoded);

        const user = await User.findById(decoded.id);
        req.user = user;

        return next();
}

module.exports = validateSessions;