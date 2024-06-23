import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  const total = cart.cart.reduce((acc, item) => acc + item.item_total, 0);

  const handlePlaceOrder = () => {
    // Implement the place order logic here
    alert('Order placed successfully!');
    navigate('/home'); // Redirect to home page after placing the order
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cart.cart.map((item) => (
              <Card sx={{ display: 'flex', mb: 2 }} key={item.item_id}>
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={item.item_photo}
                  alt={item.item_name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent>
                    <Typography component="h5" variant="h5">
                      {item.item_name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Price: &#x20B9; {item.item_price}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Total: &#x20B9; {item.item_total}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">&#x20B9; {total}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">&#x20B9; 50</Typography> {/* Dummy shipping cost */}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">&#x20B9; {total + 50}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
