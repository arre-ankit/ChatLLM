import { Router, response } from "express";
import cors from 'cors';
import { authenticateJwt } from "../middleware";
import User from "../models/user-schema.js";
import OpenAI from 'openai';
// import ollama from 'ollama';

interface Chat {
    role: string;
    content: string;
  }
  
  interface User {
    chats: Chat[];
    // other properties...
  }
  
  let user: User;

const chatRouter = Router();
chatRouter.use(cors()); 


chatRouter.post('/chatgpt/new',authenticateJwt, async(req, res) => {
  try {
    const {messages} = req.body;
    const user = await User.findById({ _id: req.headers["userId"] });
    if(!user){
        return res.status(403).json({ content: 'User not logged in' });
    }
    
    //grab chat of user
    const chats = user.chats.map(({role, content}) => ({role, content}));
    chats.push({role: "user", content: messages});
    user.chats.push({role: "user", content: messages});

    

    const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
    });

    //send all chat with new one to OpenAI 
    const completion = await openai.chat.completions.create({
        
        messages: chats as any,
        model: "gpt-3.5-turbo",
      });
      
      user.chats.push(completion.choices[0].message);
      await user.save();
    //get latest response from OpenAI

    return res.status(200).json({chats:user.chats});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ content: 'Internal server error' });
    }
});


chatRouter.post('/ollama/new',authenticateJwt, async(req, res) => {
      try {
      const {messages} = req.body;
      const user = await User.findById({ _id: req.headers["userId"] });
      if(!user){
          return res.status(403).json({ content: 'User not logged in' });
      }

      //grab chat of user
      const chats = user.chats.map(({role, content}) => ({role, content}));
      chats.push({role: "user", content: messages});
      user.chats.push({role: "user", content: messages});


      const apiUrl = 'http://127.0.0.1:11434/api/chat';

          const requestData = {
            model: 'mistral',
            messages: chats,
          };

          const data = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          })
            .then(response => response.json())
            .then(data => {
              user.chats.push({ role: data.message.role, content: data.message.content });
              return user.save();
            })
            .catch(error => console.error('Error:', error));
        //get latest response from OpenAI
        

        return res.status(200).json({chats:user.chats});
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ content: 'Internal server error' });
    }
});




export default chatRouter;