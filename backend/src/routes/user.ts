import { Router } from "express";
import User from "../models/user-schema.js";
import { set } from "mongoose";
import jwt from "jsonwebtoken";
import { authenticateJwt } from "../middleware";
import expess from "express";
import { signupInput } from "@arre-ankit/common";
import dotenv from 'dotenv';

dotenv.config();

const secret_jwt = process.env.SECRET;

const userRouter = Router();

userRouter.get("/me",authenticateJwt, async(req, res) => {      
    //get all users
    const userId = req.headers["userId"];
      const user = await User.findOne({ _id: userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
});

userRouter.post("/signup", async(req, res) => {
    let parsedInput = signupInput.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(403).json({
        msg: "error"
      });
    }

    const username = parsedInput.data.username 
    const password = parsedInput.data.password 
    
    const user = await User.findOne({ username: parsedInput.data.username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();

      if (!secret_jwt) {
        throw new Error('secret_jwt is not defined');
      }

      const token = jwt.sign({ id: newUser._id }, secret_jwt , { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
});


userRouter.post('/login', async (req, res) => {
  let parsedInput = signupInput.safeParse(req.body)
  if (!parsedInput.success) {
    return res.status(403).json({
      msg: "error"
    });
  }

  const username = parsedInput.data.username 
  const password = parsedInput.data.password 

  const user = await User.findOne({ username, password });
  if (user) {
    if (!secret_jwt) {
      throw new Error('secret_jwt is not defined');
    }
    const token = jwt.sign({ id: user._id }, secret_jwt, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

export default userRouter;







  

