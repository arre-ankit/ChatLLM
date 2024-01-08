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
exports.disconnectToDatabase = exports.connectToDatabase = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            dotenv_1.default.config(); // Load environment variables from .env file
            const mongodbUrl = process.env.MONOGODB_URL || ''; // Set a default value if MONOGODB_URL is undefined
            yield (0, mongoose_1.connect)(mongodbUrl);
        }
        catch (error) {
            console.log(error);
            throw new Error('Error connecting to database');
        }
    });
}
exports.connectToDatabase = connectToDatabase;
function disconnectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.disconnect)();
        }
        catch (error) {
            console.log(error);
            throw new Error('Error disconnecting to database');
        }
    });
}
exports.disconnectToDatabase = disconnectToDatabase;
