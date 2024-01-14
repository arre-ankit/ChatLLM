import { Router } from "express";
import userRouter from "./user";
import chatRouter from "./chat-router";
import cors from 'cors';
import app from "../app";

app.use(cors());
const appRouter = Router();

appRouter.use("/user", userRouter); //middleware
appRouter.use("/chats", chatRouter); //middleware

export default appRouter;