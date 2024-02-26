import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from 'lottie-react';
import animation from '../animation/Register.json'
import wave from '../animation/wavy.json';
import './signup.css';
import Nav from "./nav";
interface NewUser {
    email:String
    password: string
}

const SignUp = () =>{
    const nevigate = useNavigate();
    const [newUser,setNewUser] = useState<NewUser>({email:"",password:""});
    const signingUp =async () => {
        const response = await fetch("http://localhost:5000/signup",{
            headers:{
                "content-type": "application/json",
            },
            method:"POST",
            body: JSON.stringify(newUser)
        });

        nevigate("/signin");
    }
    return(
        <div className="signupMainContainer">
            <Nav/>
        <div className="signupContainer">
        <Box sx={{width:"500px"}} className="animationParent">
            <Lottie animationData={animation} />
        </Box>
        <Box className="textFieldParent">
            <Typography variant="h4" 
            sx={{paddingBottom:"30px",
            color:"rgb(23,38,58)",
            fontFamily:"fantancy",
            fontStyle:"italic",
            fontWeight:"800"}} 
            >Sign Up</Typography>
        <TextField 
            sx={{width:"70%",mb:"50px"}}
            onChange={(event)=>{
                const email = event.target.value;
                setNewUser({...newUser,email:email});
            }}
            variant="outlined"
            label="Email"
            type="email"
            ></TextField>
            <TextField
            sx={{width:"70%",mb:"60px"}}
            onChange={(event)=>{
                const password = event.target.value;
                setNewUser({...newUser,password:password});
            }}
            variant="outlined"
            label="Password"
            type="password"
            ></TextField>
            <Button variant="contained" sx={{width:"50%",backgroundColor:"rgb(23,38,58)"}} onClick={signingUp}>Sign Up</Button>
            <p>Have an account?<Button variant="text" onClick={()=>{
                nevigate("/signin")
            }}>SignIn</Button></p>
        </Box>
        <Lottie animationData={wave} className="wave" />
        </div>
        </div>
        // <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        //     <TextField
        //     placeholder="Email" 
        //     sx={{maxWidth:"200px",mb:"10px"}}
        //     onChange={(event)=>{
        //         const email = event.target.value;
        //         setNewUser({...newUser,email:email});
        //     }}

        //     ></TextField>
        //     <TextField
        //     placeholder="Password"
        //     sx={{maxWidth:"200px",mb:"20px"}}
        //     onChange={(event)=>{
        //         const password = event.target.value;
        //         setNewUser({...newUser,password:password});
        //     }}></TextField>
        //     <Button variant="contained" sx={{w:"fix-content"}} onClick={signingUp}>Sign Up</Button>
        // </Box>
    );
}
export default SignUp;