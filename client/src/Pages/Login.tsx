import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login } from '../slices/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { cartData } from '../slices/cartSlice';


interface person {
    email: string
    pass:string
}
let initialState: person = {
    email: "",
    pass:"",
}
const Login = () => {
    const [person, setPerson] = useState<person>(initialState)
    const dispatch = useAppDispatch();

const submitdata = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()  
        const email:string = person.email;
    const password:string = person.pass;
    const response = await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();
      const data = response;
      
      const Cart = await axios.get(`http://localhost:5050/fetchcart/?user_id=${data.u_id}`,{withCredentials:true});
      if (Cart.data) {
          dispatch(cartData(Cart.data))
      }
}

const oninpChangeHandler = (event: HTMLInputElement) =>{
    const { name, value } = event
    setPerson((prev) => {
        return { ...prev, [name]: value }
    })
}
    return (
        <>
         <section className="vh-100 ">
            <div className='vh-100 gradient-custom'>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-5-strong" style={{ borderRadius: "1 rem",border:"1px solid #BFBFBF",backgroundColor:"white",boxShadow:"10px 10px 5px #aaaaaa" }}>
                            <div className="card-body p-5 text-center " >

                                <h3 className="mb-5">Sign in</h3>
                                    <form id='form' onSubmit={submitdata}>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input name='email' type="text" id="typeEmailX-2" className="form-control form-control-lg" value={person.email} onChange={(e) => oninpChangeHandler(e.target)} />
                                    <label className="form-label" htmlFor="typeEmailX-2" >Email</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input name='pass' type="password" id="typePasswordX-2" value={person.pass} className="form-control form-control-lg" onChange={(e) => oninpChangeHandler(e.target)} />
                                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                </div>


                                <div className="mt-4 pt-2">
                                            <input data-mdb-ripple-init className="btn btn-primary btn-lg" value="Submit" type='submit' />
                                            </div>
                                            <div>Register Here! <a href='/register'>REGISTER</a></div>
                            </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section > 
        </>
    )
}
export default Login;