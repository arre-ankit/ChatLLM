"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors")); // Add the import statement for cors
const index_1 = __importDefault(require("./routes/index"));
const body_parser_1 = __importDefault(require("body-parser"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Add this line below app.use(express.json());
app.use(express_1.default.json()); //middleware
app.use(body_parser_1.default.json());
app.use('/api/v1', index_1.default);
exports.default = app;
