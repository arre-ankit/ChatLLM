import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate} from 'react-router';
import { useEffect, useState } from 'react';
import { SignupParams } from '@arre-ankit/common';


function AppBar(){
    const navigate = useNavigate();
    const [user, setUser] = useState<SignupParams | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/user/me', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")} `},
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                setUser(data);
                navigate("/chat");
            } else {
                alert("invalid credentials");
            }
        })
        .catch(error => console.error('Error:', error));
    }, []);

    console.log(user);

    if(user){
        return(
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '4',
            }}>
                <div style={{
                marginLeft: 5,
                cursor: 'pointer'
                }} onClick={()=> {
                navigate("/")
                }}>
                <Typography variant={"h6"}>ChatLLM</Typography>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "end" }}>
                    <div style={{ marginRight: 5,marginBottom:15 }}>
                        <Typography variant={"h6"}>{user?.username}</Typography>
                    </div>
                    <div style={{ marginLeft: 5, paddingRight: 3 }}>
                        <Button variant="contained" style={{backgroundColor:'red'}} onClick={()=> {setUser(null); navigate("/signin") }}>LogOut</Button>
                    </div>
                </div>
            </div>   
        )
    }
    return(
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '4',
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