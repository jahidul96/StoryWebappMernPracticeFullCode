const jwt = require('jsonwebtoken');
const User = require('../models/auth')
require('dotenv').config()

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('you must be authorized')
    }
    const token = authorization.replace('Bearer ', "");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: 'you must be authorized' })
        }
        const { _id } = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            next()
        })
    })
}