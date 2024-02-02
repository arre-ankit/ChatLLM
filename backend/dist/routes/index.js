"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const chat_router_1 = __importDefault(require("./chat-router"));
const cors_1 = __importDefault(require("cors"));
const appRouter = (0, express_1.Router)();
appRouter.use((0, cors_1.default)()); // Add this line below app.use(express.json());
appRouter.use("/user", user_1.default); //middleware
appRouter.use("/chat", chat_router_1.default); //middleware
exports.default = appRouter;
