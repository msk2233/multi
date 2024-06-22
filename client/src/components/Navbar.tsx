import '../styles/Navbar.css';

import "bootstrap/dist/css/bootstrap.min.css";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate,NavigateFunction } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';

export default function Navbar() {
    const Navigate: NavigateFunction = useNavigate();
    const cart = useSelector((state:RootState) => state.cart)
    const viewcart = () => {
        Navigate("/cart");
      };
      const data = localStorage.getItem('userInfo');
  
      const logout =async () =>{
        if (data) {
          const user = JSON.parse(data);
          console.log(user);
          
          await axios.post(`http://localhost:5050/addtocart`,{cartdata:cart.cart,userdata:user},{ withCredentials: true });
        }
        localStorage.removeItem('userInfo');
        localStorage.removeItem('persist:root');
        window.location.reload();
      }
      const Element = () =>{
          if (data) {
            const user = JSON.parse(data);
            return (
              <>
              <div className="d-flex" style={{color:"#fff",fontSize:"20px"}}>
                <div>
                <div>{user.fname}</div>
                </div>
            </div>
            <Button onClick={logout} sx={{color:"#fff",fontSize:"20px"}}>
            <LogoutIcon />
        </Button>
            </>
            )
          }
          else{
            return(
              <Button onClick={() => Navigate('/login')} sx={{color:"#fff",fontSize:"20px"}}>
                <LoginIcon />
            </Button>
            )
          }
      }
  return (
   

<>
 <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor:"#9E4D9A"}}>
        <Toolbar>
            <img src="assets/crown.svg" alt="crownimg"></img>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1,fontSize:"40px", display: { xs: 'none', sm: 'block' } }}
          >CrownCloth
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button onClick={viewcart} sx={{ color: '#fff' }}>
                    < ShoppingCartIcon sx={{fontSize:"50px"}}/>
              </Button>
            <Button onClick={()=>Navigate('/home')} sx={{color:"#fff",fontSize:"20px"}}>
                Home
            </Button>
            <Button>
          <Element />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
    </Box>
</>
  );
}
