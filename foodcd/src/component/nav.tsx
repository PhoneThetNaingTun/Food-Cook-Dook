import { Typography } from "@mui/material";
import './nav.css';
const Nav = () =>{
    return(
        <div className="navContainer">
            <Typography variant="h1" sx={{fontSize:"1.9rem",color:"white",padding:"30px"}}>Foodie Cookie</Typography>
        </div>
    );
}

export default Nav;