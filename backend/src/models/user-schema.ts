import e from "express";
import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
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