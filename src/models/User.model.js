const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

// exports.

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        firstName: String,
        lastName: String,
        type: String,
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

userSchema.statics.createUser = async function (
    firstName,
    lastName,
    type
) {
    try {
        const user = await this.create({ firstName, lastName, type });
        return user;
    } catch (error) {
        throw error
    }
}

userSchema.statics.getUserById = async function (id) {
    try {
        const user = await this.findOne({ _id: id });
        if (!user) throw ({ error: 'No user with this id found' })
        return user;
    } catch (error) {
        throw error;
    }
}

userSchema.statics.getAllUsers = async function () {
    try {
        const users = await this.find()
        return users;
    } catch (error) {
        throw error;
    }
}

userSchema.statics.deleteUserById = async function (id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result
    } catch (error) {
        throw error;
    }
}

module.exports = mongoose.model("User", userSchema)