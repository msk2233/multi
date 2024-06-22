import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// for cart 

    export enum CartActionTypes {
        ADD_TO_CART = 'ADD_TO_CART',
        REMOVE_FROM_CART = 'REMOVE_FROM_CART',
        UPDATE_QUANTITY = 'UPDATE_QUANTITY',
    }
    
    export interface CartItem {
        item_id: number;
        quantity: number;
        img:string,
        title:string
        price:number
    }
    
    interface AddToCartAction {
        type: CartActionTypes.ADD_TO_CART;
        payload: CartItem;
    }
    
    interface RemoveFromCartAction {
        type: CartActionTypes.REMOVE_FROM_CART;
        payload: number; // cart_id or item_id for removal
    }
    
    interface UpdateQuantityAction {
        type: CartActionTypes.UPDATE_QUANTITY;
        payload: { item_id: number; quantity: number };
    }
    
    export type CartAction = AddToCartAction | RemoveFromCartAction | UpdateQuantityAction;