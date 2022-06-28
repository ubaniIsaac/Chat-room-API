const express = require('express');

const { deleteRoomById, deleteMessageById } = require('../controllers/delete.controller.js');

const { encode } = require('../middlewares/jwt.js')

const deleteRouter = express.Router();

deleteRouter.delete('/:room/:roomId', deleteRoomById);
deleteRouter.delete('/message/:messageId', deleteMessageById);

module.exports = deleteRouter 