const express = require('express');

const users = require('../controllers/user.controller.js');

const { encode } = require('../middlewares/jwt.js')

const indexRouter = express.Router();

indexRouter.post('/login/:userId', encode, (req, res, next) => {
    return res
        .status(200)
        .json({
            success: true,
            authorization: req.authToken,
        });
});


module.exports = indexRouter 