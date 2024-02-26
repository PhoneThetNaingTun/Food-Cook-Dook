import { Box, Button, TextField, Typography } from "@mui/material";
import { constants } from "buffer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import Lottie from 'lottie-react';
import animation from '../animation/login.json';
import './signin.css';
import wave from '../animation/wavy.json';
interface User {
    email:String
    password: string
}

const SignIn = () =>{
    const navigate = useNavigate();
    const [user,setUser] = useState<User>({email:"",password:""});
    const signingin =async () => {
        const response = await fetch("http://localhost:5000/signin",{
            headers:{
                "content-type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(user),
        })
        const dataFromServer = await response.json();
        const {token} = dataFromServer;
        localStorage.setItem("token",token);
        navigate("/");
    }
    return(
        <div className="signinMainContainer">
            <Nav/>
            <div className="signinContainer">
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",}} className="textFieldContainer">
            <Typography variant="h4" 
            sx={{paddingBottom:"30px",
            color:"rgb(23,38,58)",
            fontFamily:"fantancy",
            fontStyle:"italic",
            fontWeight:"800"}} 
            >Sign In</Typography>
            <TextField
            sx={{width:"70%",mb:"50px"}}
            variant="outlined"
            label="Email"
            type="email"
            onChange={(event)=>{
                setUser({...user,email:event.target.value})
            }}
            ></TextField>
            <TextField
            sx={{width:"70%",mb:"60px"}}
            variant="outlined"
            label="Password"
            type="password"
            onChange={(event)=>{
                setUser({...user,password:event.target.value})
            }}></TextField>
            <Button variant="contained" sx={{width:"50%",backgroundColor:"rgb(23,38,58)"}} onClick={signingin}>Sign In</Button>
            <p>Have an account?<Button variant="text"  onClick={()=>{
                navigate("/signup")
            }}>SignUp</Button></p>
        </Box>
        <Lottie animationData={animation} className="animation"/>
            </div>
            <Lottie animationData={wave} className="loginwave"/>
        </div>
    );
}

export default SignIn;