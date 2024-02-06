"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("../middleware");
const user_schema_js_1 = __importDefault(require("../models/user-schema.js"));
let user;
const chatRouter = (0, express_1.Router)();
chatRouter.use((0, cors_1.default)());
chatRouter.post('/chatgpt/new', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messages } = req.body;
        const user = yield user_schema_js_1.default.findById({ _id: req.headers["userId"] });
        if (!user) {
            return res.status(403).json({ content: 'User not logged in' });
        }
        //grab chat of user
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ role: "user", content: messages });
        user.chats.push({ role: "user", content: messages });
        // const openai = new OpenAI({
        // apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
        // });
        // //send all chat with new one to OpenAI 
        // const completion = await openai.chat.completions.create({
        //     messages: chats as any,
        //     model: "gpt-3.5-turbo",
        //   })
        // const response = await ollama.chat({
        //   model: 'llama2',
        //   messages: [{ role: 'user', content: 'Why is the sky blue?' }],
        // })
        const apiUrl = 'http://127.0.0.1:11434/api/chat';
        const requestData = {
            model: 'mistral',
            messages: chats,
        };
        const data = yield fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(data => {
            user.chats.push({ role: data.message.role, content: data.message.content });
            return user.save();
        })
            .catch(error => console.error('Error:', error));
        //get latest response from OpenAI
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ content: 'Internal server error' });
    }
}));
exports.default = chatRouter;
