"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const userRouter = (0, express_1.Router)();
userRouter.get("/users", (req, res) => {
    //get all users
    try {
        const users = user_1.default.find();
        return res.status(200).json({ message: "All users", users });
    }
    catch (error) {
        return res.status(401).json({ message: "Server error", error });
    }
});
exports.default = userRouter;
