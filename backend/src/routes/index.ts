import { Router } from "express";
import userRouter from "./user";
import chatRouter from "./chat-router";
import cors from 'cors';
import app from "../app";


const appRouter = Router();
appRouter.use(cors()); // Add this line below app.use(express.json());

appRouter.use("/user", userRouter); //middleware
appRouter.use("/chat", chatRouter); //middleware

export default appRouter;