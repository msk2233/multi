import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Data } from "../slices/cartSlice";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  Box, 
  Button, 
  CircularProgress, 
  Container, 
  TextField, 
  Rating,
  Divider 
} from '@mui/material';
import { useAppDispatch } from "../hooks/redux-hooks";
import { addToCart } from "../slices/cartSlice";

const ViewProduct = () => {
  const { item_id } = useParams<{ item_id: string }>(); 
  const [item, setItem] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Data[]>([]);
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>([]);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (item) {
      dispatch(addToCart({ ...item, quantity }));
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/product/?id=${item_id}`, { withCredentials: true });
        setItem(response.data.product);
        // Fetch related products and reviews
        const relatedResponse = await axios.get(`http://localhost:5050/products/related/?id=${item_id}`);
        setRelatedProducts(relatedResponse.data.products);
        const reviewsResponse = await axios.get(`http://localhost:5050/product/reviews/?id=${item_id}`);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [item_id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!item) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: { xs: '100%', md: '50%' }, height: 'auto', objectFit: 'cover' }}
                image={item.item_photo}
                alt={item.item_name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent>
                  <Typography component="h5" variant="h5">
                    {item.item_name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {item.item_desc}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Available Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Price: ₹ {item.item_price}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mr: 2 }}>
                      Quantity:
                    </Typography>
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      inputProps={{ min: 1, max: item.quantity, step: 1 }}
                      sx={{ width: 70 }}
                    />
                  </Box>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                    Total: ₹ {item.item_price * quantity}
                  </Typography>
                  <Box sx={{ p: 2, mt: 'auto' }}>
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Product Reviews</Typography>
              <Divider sx={{ mb: 2 }} />
              {reviews.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No reviews yet.</Typography>
              ) : (
                reviews.map((review, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body2">{review.comment}</Typography>
                  </Box>
                ))
              )}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 8 }}>
          <Typography variant="h6">Related Products</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={4}>
            {relatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.item_id}>
                <Card>
                  <CardMedia
                    component="img"
                    sx={{ height: 200, objectFit: 'cover' }}
                    image={product.item_photo}
                    alt={product.item_name}
                  />
                  <CardContent>
                    <Typography component="h6" variant="h6">
                      {product.item_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹ {product.item_price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ViewProduct;
