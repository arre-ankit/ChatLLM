"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const chat_router_1 = __importDefault(require("./chat-router"));
const appRouter = (0, express_1.Router)();
appRouter.use("/user", user_1.default); //middleware
appRouter.use("/chats", chat_router_1.default); //middleware
exports.default = appRouter;
