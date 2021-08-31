
import React,{useEffect}from 'react'
import { CartState } from "../context/Context";
import { BsHeart } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import Rating from "./Rating";
import './Myorders.css'

const Mywishlist = () => {
    const {
        state: {wishlist },dispatch } = CartState();
    useEffect(()=>{
        console.log(wishlist)
    })
    return (
        <div className="orders-home">

{wishlist.length > 0 ? (
        <div className="cart-product-container">
          <ul className="list-group">
            {wishlist.map((prod) => {
              return (
                <li key={prod.name*Math.random()+Math.random()} className="list-group-item">
                  <div className="row">
                    <img src={prod.image} alt={prod.name} />
                    <h5 className="col">{prod.name}</h5>
                    <h4 className="col">₹ {prod.price}</h4>
                    <h5 className="col ">
                      <Rating rating={prod.ratings} onclick={() => {}} />
                    </h5>
                    {wishlist.find((o) => o.id === prod.id) ? (
                <BsFillHeartFill
                  className="col " style={{color:"red",fontSize:"30px",cursor:"pointer"}}
                  onClick={() => {
                    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: prod });
                  }}
                />
              ) : (
                <BsHeart
                  className="col " style={{color:"red",fontSize:"30px"}}
                  onClick={() => {
                    dispatch({ type: "ADD_TO_WISHLIST", payload: prod });
                  }}
                />
              )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="cart-product-container">
          <h2>There is no item .. Go to cart and add to wishlist...</h2>
        </div>
      )}




            
        </div>
    )
}

export default Mywishlist
