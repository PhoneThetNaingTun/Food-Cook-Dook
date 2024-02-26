import { Box, Button } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Menu from "./menu";

const App = () =>{
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to={"/signin"}/>
    }
    return(
        <Button onClick={()=>{
            navigate("/menus")
        }}>Menu Page</Button>
    );
}
export default App;