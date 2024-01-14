import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Typography, Card, TextField, Button } from '@mui/material';

function SignUp(){
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();
        
        const handleSignup = async () => {
            const response = await fetch('http://localhost:3000/api/v1/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            // Todo: Create a type for the response that you get back from the server
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token)
                navigate("/chat");
            } else {
                alert("Error while signing up");
            }
        };

        return(
            <div>
                <div style={{
                    paddingTop: 150,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Typography variant="h4">Sign Up! <br/> Below</Typography>
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
                            onClick={handleSignup}>
                            Sign Up</Button>
                    </Card>
    
                </div>

            </div>    
        )
}


export default SignUp;
