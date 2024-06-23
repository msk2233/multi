import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const userInfo = localStorage.getItem('userInfo');

  const logout = async () => {
    if (userInfo) {
      const user = JSON.parse(userInfo);
      await axios.post(`http://localhost:5050/addtocart`, {
        cartdata: cart.cart,
        userdata: user,
        append: false
      }, { withCredentials: true });
    }
    localStorage.removeItem('userInfo');
    localStorage.removeItem('persist:root');
    window.location.reload();
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#9E4D9A' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CrownCloth
        </Typography>
        {userInfo ? (
          <>
            <Typography sx={{ color: '#fff', mr: 2 }}>{JSON.parse(userInfo).fname}</Typography>
            <Button onClick={logout} startIcon={<LogoutIcon />} sx={{ color: '#fff' }}>Logout</Button>
          </>
        ) : (
          <Button onClick={() => navigate('/login')} startIcon={<LoginIcon />} sx={{ color: '#fff' }}>Login</Button>
        )}
        <Button onClick={() => navigate('/cart')} startIcon={<ShoppingCartIcon />} sx={{ color: '#fff' }}>Cart</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
  
