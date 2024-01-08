"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./db/connection");
(0, connection_1.connectToDatabase)().then(() => {
    const PORT = process.env.PORT;
    app_1.default.listen(PORT, () => {
        console.log('Server running on port 3000 & Connected to Database');
    });
}).catch(error => {
    console.log(error);
});
