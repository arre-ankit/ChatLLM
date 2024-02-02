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
const user_schema_js_1 = __importDefault(require("../models/user-schema.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const common_1 = require("@arre-ankit/common");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Add the import statement for cors
dotenv_1.default.config();
const secret_jwt = process.env.SECRET;
const userRouter = (0, express_1.Router)();
userRouter.use((0, cors_1.default)()); // Add this line below app.use(express.json());
userRouter.get("/me", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield user_schema_js_1.default.findOne({ _id: userId });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.status(403).json({ content: 'User not logged in' });
    }
}));
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedInput = common_1.signupInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(403).json({
            msg: "error"
        });
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const user = yield user_schema_js_1.default.findOne({ username: parsedInput.data.username });
    if (user) {
        res.status(403).json({ content: 'User already exists' });
    }
    else {
        const newUser = new user_schema_js_1.default({ username, password });
        yield newUser.save();
        if (!secret_jwt) {
            throw new Error('secret_jwt is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, secret_jwt, { expiresIn: '1h' });
        res.json({ content: 'User created successfully', token });
        setTimeout(() => {
            window.location.href = '/login';
        }, 60 * 60 * 1000);
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedInput = common_1.signupInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(403).json({
            msg: "error"
        });
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const user = yield user_schema_js_1.default.findOne({ username, password });
    if (user) {
        if (!secret_jwt) {
            throw new Error('secret_jwt is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret_jwt, { expiresIn: '1h' });
        res.json({ content: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ content: 'Invalid username or password' });
    }
}));
exports.default = userRouter;
