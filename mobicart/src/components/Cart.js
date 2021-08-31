import React, { useState, useEffect } from "react";
 import StripeCheckout from 'react-stripe-checkout'
 import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "./Cart.css";
toast.configure()
const Cart = () => {
  const {
    state: { cart },
    dispatch
  } = CartState();
  const [totalAmount, setTotalAmount] = useState();
  useEffect(() => {
    const reducer = (acc, product) =>
      acc + Number(product.price.replace(",", "")) * product.qty;
    setTotalAmount(cart.reduce(reducer, 0));
  }, [cart]);


  const BuyNow=(token)=>{
    
     
    return(
     fetch(`/makepayment`,{
       method:"post",
       headers:{
           "content-Type":"application/json",
          
       },
       body:JSON.stringify({
      token,
 
      })
   }).then(res=>{
     console.log(res);
     if(res.statusText==="OK"){
       
       dispatch({type:"ADD_TO_ORDERED_PRODUCTS_VIA_CART",payload:cart})
       dispatch({type:"REMOVE_ALL_FROM_CART"})
     }
    })
   .catch(err=>console.log(err))
 
    )
     
    }


  return (
    <div className="cart-home">
      {cart.length > 0 ? (
        <div className="cart-product-container">
          <ul className="list-group">
            {cart.map((prod) => {
              return (
                <li key={prod.id} className="list-group-item">
                  <div className="row">
                    <img src={prod.image} alt={prod.name} />
                    <h5 className="col-4">{prod.name}</h5>
                    <h4 className="col">₹ {prod.price}</h4>
                    <h5 className="col ">
                      <Rating rating={prod.ratings} onclick={() => {}} />
                    </h5>
                    <div className="col ">
                      <form>
                        <select
                          onChange={(e) => {
                            dispatch({
                              type: "CHANGE_QTY",
                              payload: {
                                id: prod.id,
                                qty: e.target.value
                              }
                            });
                          }}
                        >
                          {[...Array(prod.inStock).keys()].map((i) => {
                            return <option value={i + 1}>{i + 1}</option>;
                          })}
                        </select>
                      </form>
                    </div>

                    <MdDelete
                      // className="col-4 "
                      className="col"
                      fontSize="35px"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod
                        });
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="cart-product-container">
          <h2>There is no item in the cart</h2>
        </div>
      )}

      <div className="cart-summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: ₹ {totalAmount}
        </span>
        <button
          className="btn btn-warning text-white"
          disabled={cart.length === 0}
        >
         <StripeCheckout
            stripeKey="pk_test_51JUQKISIc19WDGdZtOXH8ueCYk0N31t1sEfjZohHXJldiPETLm6ZV17yuFtHZagIQR8Y7UmK1GOME8Em2Fi5uGRP00oVSHiNkO"
           //stripeKey={process.env.REACT_APP_API_KEY}
            token={BuyNow}
            name="Buy Product"
           amount={totalAmount*100/72.97}
            panelLabel="Pay"
           
            
            // shippingAddress
            // billingAddress
           
            >
               Procced to checkout
            </StripeCheckout>
         
        </button>
      </div>
    </div>
  );
};
export default Cart;
