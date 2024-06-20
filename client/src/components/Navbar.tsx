import "bootstrap/dist/css/bootstrap.min.css";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate,NavigateFunction } from "react-router-dom";

export default function Navbar() {
    const Navigate: NavigateFunction = useNavigate();
    const viewcart = () => {
        Navigate("/cart");
      };
  return (
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
            <Button sx={{color:"#fff",fontSize:"25px"}}>
                Login
            </Button>
              <Button onClick={viewcart} sx={{ color: '#fff' }}>
                    < ShoppingCartIcon sx={{fontSize:"50px"}}/>
              </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
    </Box>
  );
}
