import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';

const ChatItems = ({content,role}:{content:string,role:string})=>{
    return role === "chatbot" ? <div>
                <Box sx={{display:'flex', p:2, my:2,gap:2}}>
                    <Avatar sx={{ml:0}}>
                        <img src='' alt=''></img>
                    </Avatar>
                    <Box><Typography fontSize={20}>{content}</Typography></Box>
                </Box>
                </div> : 
                <div>
                <Box sx={{display:'flex', p:2, backgroundColor:'grey',gap:2}}>
                    <Avatar sx={{ml:0}}>
                        <img src='' alt=''></img>
                    </Avatar>
                    <Box><Typography fontSize={20}>{content}</Typography></Box>
                </Box>
                </div>
}

export default ChatItems