"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const index_1 = __importDefault(require("./routes/index"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware
app.use('/api/v1', index_1.default);
exports.default = app;
