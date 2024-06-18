import React from "react";
import { Route, Routes ,useNavigate,NavigateFunction } from "react-router-dom";
import Reg from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
// const Cart = React.lazy(() => import('./Pages/Cart'))

const Application = () => {
    return (
        <Routes>
            <Route path="/register" element={<Reg />} />
            <Route path="/" element={<Reg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
        </Routes>
    )
}
export default Application;