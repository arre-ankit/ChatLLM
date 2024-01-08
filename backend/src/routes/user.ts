import { Router } from "express";
import User from "../models/user-schema";

const userRouter = Router();

userRouter.get("/users", async(req, res) => {      
    //get all users
    try{
        const users = await User.find();
        return res.status(200).json({message: "All users", users});
    }
    catch(error){
        console.log(error);
        return res.status(401).json({message: "Server error", error});
    }
});

export default userRouter;