import Box from '@mui/material/Box';
import ChatSideBar from './ChatSideBar';
import {ReactNode} from 'react';
import SendIcon from '@mui/icons-material/Send';
import ChatItems from './ChatItems';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';



interface ChatProps {
    children: ReactNode,
}

type content = {
    content: string,
    role: string
};


function Chat({children}: ChatProps){
    const [chatcontents, setChatcontents] = useState<content[]>([]);
    const inputRef = useRef<HTMLInputElement|null>(null);
    const handleSubmit = async()=>{
        const content = inputRef.current?.value;
        if(inputRef.current && inputRef){
            inputRef.current.value = "";
        }
        const newcontent: content = { content: content ?? '', role: "user" };
        setChatcontents((prevcontents)=> [...prevcontents, newcontent]);

        //api
        
        const sendChatReq = async (message:string) => {
            const res = await axios.post("http://localhost:3000/api/v1/chat/chatgpt/new", {message});

            if(res.status !=200){
                console.log("error");
            }

            const data = await res.data;
            return data;
        } 

        const chatData = await sendChatReq(content ?? '');
        
        setChatcontents([...chatData.chats]);
        
    }

    return(
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100vh',
            overflowX: 'hidden',
            overflowY: 'hidden',
        }}>
            <ChatSideBar/>
            <Box sx={{
                //backgroundColor: 'red',
                width: '100%',
                overflowX: 'hidden',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: {xs: 'row', lg: 'column'},
            }}>{children} 
                <p>How can I help you today?</p>
                
                <Box sx={{
                    //backgroundColor: 'yellow',
                    width: '100%',
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    mx: "auto",
                    overflow:'scroll',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    scrollBehavior: 'smooth',
                }}>
                    {chatcontents.map((content, index) => (
                        <ChatItems key={index} content={content.content} role={content.role} />
                    ))}
                </Box>
                {" "}
                <div style={{
                    width:"100%",
                    padding:"2px",
                    borderRadius:8,
                    display:'flex',
                    margin:'auto'}}>
                    <input type="text" placeholder="Type your content here..." ref={inputRef}
                    style={{width: '100%',
                            backgroundColor:'gray',
                            padding: 20,
                            border: '10',
                            borderRadius: 10,
                            outline: 'none',
                            fontSize: '1rem',
                        }} />
                    <IconButton onClick={handleSubmit} ><SendIcon sx={{ml:"auto",color:'white'}}/></IconButton>
                </div>
            </Box>
        </div>
    )
}

export default Chat;