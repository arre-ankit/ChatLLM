import Typography from '@mui/material/Typography';
import { Button , Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



function AppBar(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    if(email){
        return(
            <div>
                Ankit
            </div>
        )
    }
    return(
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '4',
            zIndex: '1'
        }}>
            <div style={{
                marginLeft: 5,
                cursor: 'pointer'
            }} onClick={()=> {
                    navigate("/")
            }}>
                <Typography variant={"h6"}>ChatLLM</Typography>
            </div>

            <div style={{ display: 'flex' }}> 
                <div style={{ marginRight: 5 }}>
                    <Button variant="contained" style={{backgroundColor: '#242424', color:'white'}} onClick={()=> { navigate("/signin") }}>Sign In</Button>
                </div>
                <div style={{ marginLeft: 5, paddingRight: 3 }}>
                    <Button variant="contained" onClick={()=> { navigate("/signup") }}>Sign Up</Button>
                </div>
            </div>
        
        </div>
    )
}

export default AppBar;