import 'bootstrap/dist/css/bootstrap.min.css';
// import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/cart.css'
import { Cartdata} from '../interfaces/commonInt';
import { toast } from 'react-hot-toast'

function Cart() {
  const [cartdata,setCartdata] = useState<Array<Cartdata>>([]);
  // const [invoice,setInvoice] = useState<Invoicedata['price']>(0);
  const cookie = document.cookie;
  const fetchcart =async () =>{
    const fetchdetailcart = await axios.get('http://localhost:5050/fetchcart', { withCredentials: true });
   setCartdata(fetchdetailcart.data.cartdetail)
  }
  const back = () =>{
    window.history.back();
  }

  const handleRemove =async (id:number) =>{
    const removeFromcart = await axios.get(`http://localhost:5050/removecart/?cart_id=${id}`, { withCredentials: true });
    if (removeFromcart.data === "deleted") {
      toast.success("Removed Successsfully");
    }
    else{
      toast.error("there is error");
    }
    fetchcart();
  }
  useEffect(() => {
    fetchcart();
  },[]);
  if (!cookie) {
    return(
      <>
        <h1>Access Denied</h1>
      </>
    )
  }
  else{
    return (
      <>
          <section className='card cart'>
          <div className='card-wrap'>
            <nav className="navbar navbar-expand-md navbar-dark navbar">
              <div className="container">
                <div className="navbar-brand m-auto">Simple Ecommerce</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </nav>
            <section className="jumbotron text-center">
              <div className="container">
                <h1 className="jumbotron-heading">E-COMMERCE CART</h1>
              </div>
            </section>
  
            <div className="container mb-4">
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col"> </th>
                          <th scope="col">Product</th>
                          <th scope="col">Available</th>
                          <th scope="col" className="text-right">Price</th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                       {cartdata.map((obj)=>{
                        return(
                          <tr>
                          <td><img src={obj.item_photo} style={{height:"100px",width:"100px"}} alt="no data"/> </td>
                          <td>{obj.item_name}</td>
                          <td>In stock</td>
                          <td className="text-right">&#x20B9; {obj.item_price}</td>
                          <td className="text-right"><button onClick={() => handleRemove(obj.cart_id)} className="btn btn-sm btn-danger"><i className="bi bi-trash3"></i> </button> </td>
                        </tr>
                        )
                       })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td>Sub-Total</td>
                          <td className="text-right"></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td>Shipping</td>
                          <td className="text-right">6,90 €</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td><strong>Total</strong></td>
                          <td className="text-right"><strong>346,90 €</strong></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col mb-2">
                  <div className="row">
                    <div className="text-center">
                      <button className="btn btn-lg btn-block btn-success text-uppercase" onClick={back}>BACK</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
         )
      </>
    );
  }
}

export default Cart;
