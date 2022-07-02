const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MESSAGE_TYPES = {
    TYPE_TEXT: "text",
}

const readByRecipientSchema = new mongoose.Schema(
    {
        _id: false,
        readByUserId: String,
        readAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: false,
    }
);

const chatMessageSchema = new mongoose.Schema(

)
