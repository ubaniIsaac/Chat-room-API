const makeValidation = require("@withvoid/make-validation")
// const { CHAT_ROOM_TYPES } = require("../models/chatRoom.model")
const chatRoomModel = require("../models/chatRoom.model")


const CHAT_ROOM_TYPES = {
    CONSUMER_TO_CONSUMER: "consumer-to-consumer",
    CONSUMER_TO_SUPPORT: "consumer-to-support",
};

exports.initiate = async (req, res) => {
    try {
        const validation = makeValidation(types => ({
            payload: req.body,
            checks: {
                userIds: {
                    type: types.array,
                    options: { unique: true, empty: false, stringOnly: true }

                }, type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } }

            },
        }));
        if (!validation.success) return res.status(400).json({ ...validation });

        const { userIds, type } = req.body;
        const { userId: chatInitiator } = req;
        const allUserIds = [...userIds, chatInitiator];
        const chatRoom = await chatRoomModel.initiateChat(allUserIds, type, chatInitiator);
        return res.status(200).json({ success: true, chatRoom })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
exports.postMessage = async (req, res) => { }
exports.getRecentConversation = async (req, res) => { }
exports.getConversationByRoomId = async (req, res) => { }
exports.markConversationReadByRoomId = async (req, res) => { }