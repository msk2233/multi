import React from "react";
import { Route, Routes } from "react-router-dom";
import Reg from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Buy from './Pages/Buy'
import ViewProduct from "./Pages/ProductView";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
// const Cart = React.lazy(() => import('./Pages/Cart'))

const Application = () => {
    return (
        <>
        <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/register" element={<Reg />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedLayout />}>
        <Route path="/buy" element={<Buy />}  />
        </Route>
        <Route path="/cart" element={<Cart />}  />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:item_id" element={<ViewProduct />} />
      </Routes>
        </>
    )
}
export default Application;