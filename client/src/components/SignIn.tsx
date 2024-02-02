import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Typography, Card, TextField, Button } from '@mui/material';
import { SignupParams } from '@arre-ankit/common';

function SignIn(){
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async()=>{
        const reqBody: SignupParams = {username, password} 
        const response = await fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            navigate("/chat");
        } else {
            alert("invalid credentials");
        }
    }
    
    return(
        <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant="h4">Welcome Back! <br></br> Sign In Below</Typography>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Card variant={"outlined"} 
                    style={{width: 400, padding: 20}}>

                    <TextField
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        fullWidth={true}
                        label="Email"
                        variant="outlined"
                    />
                    <br/><br/>
                
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        type={"password"}
                    />
                    <br/><br/>

                    <Button size="large" variant="contained" color="primary" 
                        onClick={handleLogin}>
                        Sign In</Button>
                </Card>

            </div>

        </div>
    )
}

export default SignIn;