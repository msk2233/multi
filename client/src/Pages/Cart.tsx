import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/cart.css";
import { useState, useEffect } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useSelector } from 'react-redux';
import { RootState } from "../store";
import { Data } from "../slices/cartSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { incrementQuantity,decrementQuantity ,removeItem} from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";


function Cart() {
  const [cartdata, setCartdata] = useState<Array<Data>>([]);
  const [total,setTotal] = useState<number>(0)
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const cart = useSelector((state:RootState) => state.cart)

  const fetchcart = async () => {
    setCartdata(cart.cart);
    let subtotal:number = 0;
    cart.cart.forEach((ele:Data) => {
        subtotal += ele.item_total;
    })
    setTotal(subtotal);
  };
  const increment =async (item_id:number) =>{
      dispatch(incrementQuantity(item_id));
  }
  const decrement = async (item_id:number) =>{
    dispatch(decrementQuantity(item_id))
  }

  const handleRemove = async (id: number) => {
    // const removeFromcart = await axios.get(
    //   `http://localhost:5050/removecart/?cart_id=${id}`,
    //   { withCredentials: true }
    // );
    dispatch(removeItem(id))
    // if (removeFromcart.data === "deleted") {
    //   toast.success("Removed Successsfully");
    // } else {
    //   toast.error("there is error");
    // }
  };
  const buy = () =>{
    Navigate('/buy');
  }
  useEffect(() => {
    fetchcart();
  }, [cart]);
    return (
      <>
      <Navbar></Navbar>
        <section className="card cart">
          <div className="card-wrap">
            <nav className="navbar navbar-expand-md navbar-dark navbar">
              <div className="container">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarsExampleDefault"
                  aria-controls="navbarsExampleDefault"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </nav>
            <section className="jumbotron text-center">
              <div className="container">
                <h1 className="jumbotron-heading">CART</h1>
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
                          <th scope="col">Quantity</th>
                          <th scope="col" className="text-right">
                            Price
                          </th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartdata.map((obj) => {
                          return (
                            <tr>
                              <td>
                                <img
                                  src={obj.item_photo}
                                  style={{ height: "100px", width: "100px" }}
                                  alt="no data"
                                />{" "}
                              </td>
                              <td>{obj.item_name}</td>
                              <td>
                                <span style={{marginRight:"20px",fontSize:"15px",fontWeight:"700"}}> {obj.quantity} </span>
                                <ButtonGroup>
                                  <div className="border d-flex justify-content-between" style={{width:"50px"}}>
                                    <RemoveIcon onClick={() => decrement(obj.item_id)} fontSize="medium" />
                                    <AddIcon onClick={() => increment(obj.item_id)} fontSize="medium" />
                                  </div>
                                </ButtonGroup>
                              </td>
                              <td className="text-right">
                                &#x20B9; {obj.item_total}
                              </td>
                              <td className="text-right">
                                <button
                                  onClick={() => handleRemove(obj.item_id)}
                                  className="btn btn-sm btn-danger"
                                >
                                  <i className="bi bi-trash3"></i>{" "}
                                </button>{" "}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td>
                            <strong>Total</strong>
                          </td>
                          <td className="text-right">
                            <strong>{total}</strong>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col mb-2">
                  <div className="row">
                    <div className="text-center">
                      <button
                        className="btn btn-lg btn-block btn-success text-uppercase"
                        onClick={buy}
                      >
                        BUY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default Cart;
