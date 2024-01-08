import { Router } from "express";
import userRouter from "./user";
import chatRouter from "./chat-router";


const appRouter = Router();

appRouter.use("/user", userRouter); //middleware
appRouter.use("/chats", chatRouter); //middleware

export default appRouter;