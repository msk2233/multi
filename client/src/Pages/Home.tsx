import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "../styles/home.css";
import {  Userint } from "../interfaces/commonInt";
import { useAppDispatch } from "../hooks/redux-hooks";
import {Fetch} from '../actions/action'
import { addToCart } from "../slices/cartSlice";
import { Data } from "../slices/cartSlice";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const App = () => {
  const dispatch = useAppDispatch();

  const [itemdata, setItemdata] = useState<Array<Data>>([]);
  const [userdata, setUserdata] = useState<Userint>();

  const addtocart = (obj:Data) => async () => {
    dispatch(addToCart(obj))

    // const toCart = await axios.post(
    //   `http://localhost:5050/addtocart`,
    //   { item_id: itemid, user_id: uid },
    //   { withCredentials: true }
    // );
    // if (toCart.data === "exist") {
    //   toast.error("Already Exist in cart");
    // } else if (toCart.data === "failed") {
    //   toast.error("Failed");
    // } else {
    //   toast.success("Added to cart");
    // }
  };
  const fetchdetail = async () => {
    const Fetchdata =  await dispatch(
      Fetch()
    ).unwrap();
    setUserdata(Fetchdata.user_detail);
    setItemdata(Fetchdata.fetchItem);
  };
  useEffect(() => {
    fetchdetail();
  }, []);
  
  return (
    <>
      <div>
        <Navbar />
      </div>
      <section style={{width:"90%",margin:"0 auto"}}>
            <section style={{ backgroundColor: "#eee", overflow: "scroll"}}>
              <div className="row rowclass">
                {itemdata.map((obj) => {
                  return (
                    <div className="col-md-3  m-3 p-5 ">
                      <div className="product-grid">
                        <div className="product-image">
                          <img
                            style={{ height: "40vh",width:"20vw" }}
                            className="pic"
                            src={obj.item_photo}
                            alt="no data"
                          />
                          <ul className="product-links">
                            <li>
                              <a
                                onClick={addtocart(obj)}
                              > Add to cart
                              </a>
                            </li>
                            <li>
                              <a>
                                {/* <Link to={`/product/${obj.item_id}`}> */}
                                 Quick View
                                 {/* </Link> */}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="product-content">
                          <h3 className="title">
                            <a href="#">{obj.item_name}</a>
                          </h3>
                          <div className="price">&#x20B9; {obj.item_price}</div>
                        </div>
                      </div>
                     </div>
                  );
                })}
              </div>
            </section>
          {/* </div> */}
        {/* </div> */}
      </section>
    </>
  );
};
export default App;
