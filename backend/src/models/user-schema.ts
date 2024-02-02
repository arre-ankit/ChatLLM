import e from "express";
import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    id:{
        type: String,
        default: Date.now
    },
    role:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    name:{
        type: String,
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [ChatSchema]
    });


    export default mongoose.model("User", UserSchema);