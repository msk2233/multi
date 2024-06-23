import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Data } from '../slices/cartSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { incrementQuantity, decrementQuantity, removeItem } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
  const [total, setTotal] = useState<number>(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  const fetchCart = () => {
    let subtotal: number = 0;
    cart.cart.forEach((ele: Data) => {
      subtotal += ele.item_total;
    });
    setTotal(subtotal);
  };

  const increment = (item_id: number) => {
    dispatch(incrementQuantity(item_id));
  }

  const decrement = (item_id: number) => {
    dispatch(decrementQuantity(item_id));
  }

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  }

  useEffect(() => {
    fetchCart();
  }, [cart]);

  return (
    <>
      <Navbar />
      <section className="container mt-4">
        <h1 className="text-center mb-4">CART</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col" className="text-right">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.cart.map((obj) => (
                <tr key={obj.item_id}>
                  <td>
                    <img src={obj.item_photo} alt="product" style={{ height: '100px', width: '100px' }} />
                    {obj.item_name}
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button onClick={() => decrement(obj.item_id)} startIcon={<RemoveIcon />}>-</Button>
                      <span style={{ margin: '0 10px', fontSize: '15px', fontWeight: '700' }}>{obj.quantity}</span>
                      <Button onClick={() => increment(obj.item_id)} startIcon={<AddIcon />}>+</Button>
                    </div>
                  </td>
                  <td className="text-right">&#x20B9; {obj.item_total}</td>
                  <td className="text-center">
                    <Button onClick={() => handleRemove(obj.item_id)} startIcon={<DeleteIcon />} variant="contained" color="error">Remove</Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={2}><strong>Total</strong></td>
                <td className="text-right"><strong>&#x20B9; {total}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <Button onClick={() => navigate('/buy')} variant="contained" color="success" size="large">BUY</Button>
        </div>
      </section>
    </>
  );
}

export default Cart;
