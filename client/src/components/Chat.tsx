import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

function Chat(){
     

    return(
        <div style={{
            padding:20
        }}>
            <Box style={{
                display: "flex",
                justifyContent: "center",
                width: 350,
                height:350,
                border: "1px solid grey",
            }}>
                <Typography variant="h6">You are talking to ChatLLM</Typography>
                <div style={{   
                    position: "absolute",
                    padding:270,
                }}>
                    <Button variant="contained" style={{ color:'white'}} onClick={()=> {  }}>Clear Conversation</Button>
                </div>
                
            </Box>

        </div>
    )
}

export default Chat;