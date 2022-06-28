const express = require('express');

const { getRecentConversation, getConversationByRoomId, initiate, postMessage, markConversationReadByRoomId } = require('../controllers/chatRoom.controller');

const { encode } = require('../middlewares/jwt.js')

const chatRoomRouter = express.Router();

chatRoomRouter.get('/', getRecentConversation);
chatRoomRouter.get('/:roomId', getConversationByRoomId);
chatRoomRouter.post('/initiate', initiate);
chatRoomRouter.post('/:roomId/message', postMessage);
chatRoomRouter.put('/:roomId/mark-read', markConversationReadByRoomId);

module.exports = chatRoomRouter