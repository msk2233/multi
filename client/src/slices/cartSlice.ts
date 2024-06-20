import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Data{
    createdAt: Date
    deletedAt: Date
    isdeleted: boolean
    item_desc: String
    item_id: number
    item_name: string
    item_photo: string
    item_price: number
    updatedAt: Date
    quantity:number,
    item_total:number
  }
 
  interface CartState{
    cart:Data[],
  }
  const initialState:CartState = {cart:[]}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      addToCart: (state, action:PayloadAction<Data>) => {
          const itemInCart = state.cart.find((item:Data) => item.item_id === action.payload.item_id);
          if (itemInCart) {
            itemInCart.quantity++;
            itemInCart.item_total += Number(itemInCart.item_price);
          } else {
            state.cart.push({...action.payload,item_total:Number(action.payload.item_price), quantity: 1 });
            }  
        },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.item_id=== action.payload);
      item!.item_total += Number(item!.item_price);
      item!.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.item_id=== action.payload);
      if (item!.quantity === 1) {
        item!.quantity = 1
      } else {
        item!.item_total -= Number(item!.item_price);
        item!.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.item_id!== action.payload);
      state.cart = removeItem;
    },
  },
});
 const CartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;

export default CartReducer;