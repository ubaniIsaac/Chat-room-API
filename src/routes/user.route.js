const express = require('express');

const { onGetAllUsers, onCreateUser, onGetUserById, onDeleteUserById } = require('../controllers/user.controller.js');

const { encode } = require('../middlewares/jwt.js')

const userRouter = express.Router();

userRouter.get('/', onGetAllUsers);
userRouter.post('/', onCreateUser);
userRouter.get('/:id', onGetUserById);
userRouter.delete('/:id', onDeleteUserById);

module.exports = userRouter;