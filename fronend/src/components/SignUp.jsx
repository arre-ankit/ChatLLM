import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, TextField, Button } from '@mui/material';

function SignUp(){
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();
        
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
                                setEmail(e.target.value);
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
                            onClick={() => {
                                navigate("/chat");
                            }}>
                            Sign Up</Button>
                    </Card>
    
                </div>

            </div>    
        )
}


export default SignUp;
