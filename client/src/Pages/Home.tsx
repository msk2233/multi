import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'
import '../styles/home.css'
import { Itemdata, Userint } from '../interfaces/commonInt';

interface items {
  title: string,
  price: number,
  description: string,
  image: string,
}

const App = () => {
  const [itemdata, setItemdata] = useState<Array<Itemdata>>([]);
  const [userdata, setUserdata] = useState<Userint>();
  const Navigate: NavigateFunction = useNavigate();
  const cookie = document.cookie;
  const addtocart = (itemid: number, uid: number | undefined) => async () => {
    const toCart = await axios.post(`http://localhost:5050/addtocart`, { item_id: itemid, user_id: uid }, { withCredentials: true });
    if (toCart.data == "exist") {
      toast.error("Already Exist in cart")
    }
    else if (toCart.data == "failed") {
      toast.error("Failed")
    }
    else {
      toast.success("Added to cart");
    }
  }
  const viewcart = () => {
    Navigate('/cart')
  }
  const fetchdetail = async () => {
    const fetchdetail = await axios.get('http://localhost:5050/fetchdetail', { withCredentials: true })
    setUserdata(fetchdetail.data.user_detail[0])
    setItemdata(fetchdetail.data.fetchItem)
  }
  useEffect(() => {
    fetchdetail();
  }, []);

  if (!cookie) {
    return (
      <><h1>Access deined</h1></>
    )
  }
  else {
    return (
      <>
        <section className="vh-100">
          <div className='vh-100 gradient-custom'>
            <div className='d-flex justify-content-between m-auto' style={{ height: "10%" }}>
              <div className='bg-light m-2 h-50 rounded'>
                <h2>User_name:{userdata?.fname}</h2>
              </div>
              <div>
                <button className='btn btn-danger m-3' onClick={viewcart}>View Cart</button>
              </div>
            </div>
            <div className="bg-body-secondary d-flex flex-column m-auto" style={{ height: "85%", width: "95%" }}>
              <section style={{ backgroundColor: "#eee", overflow: "scroll" }}>
                <div className="row">
                  {itemdata.map((obj) => {
                    return (
                      <div className="col-md-3 col-sm-6">
                        <div className="product-grid">
                          <div className="product-image">
                            <img style={{ height: "600px" }} className="pic" src={obj.item_photo} alt="no data"/>
                            <ul className="product-links">
                              <li><a onClick={addtocart(obj.item_id, userdata?.u_id)}><i className="fa fa-shopping-bag"></i> Add to cart</a></li>
                              <li><a><i className="fa fa-search"></i> Quick View</a></li>
                            </ul>
                          </div>
                          <div className="product-content">
                            <h3 className="title"><a href="#">{obj.item_name}</a></h3>
                            <div className="price">&#x20B9; {obj.item_price}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          </div>
        </section>
      </>
    )
  }
}
export default App;