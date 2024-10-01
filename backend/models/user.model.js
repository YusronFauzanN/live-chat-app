import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ['female', 'male']
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User;