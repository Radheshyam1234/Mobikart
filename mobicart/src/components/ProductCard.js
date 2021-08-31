import React,{useState} from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { BsHeart } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { CartState } from "../context/Context";
const ProductCard = ({ prod }) => {
  const {
    state: { cart, wishlist },
    dispatch
  } = CartState();
 

  const BuyNow=(token)=>{
   // console.log(token)
    
   return(
    fetch(`http://localhost:8080/makepayment`,{
      method:"post",
      headers:{
          "content-Type":"application/json",
         
      },
      body:JSON.stringify({
     token,

     })
  }).then(res=>console.log(res))
  .catch(err=>console.log(err))

   )
    
   }

  return (
    <>
      <div className="card" style={{ maxWidth: "300px", maxHeight: "600px" }}>
        <img className="card-img-top" src={prod.image} alt={prod.name} />

        <div className="card-body">
          <h4 className="card-title">{prod.name} </h4>
          <h5 className="card-text">
            ₹{prod.price}
            <span style={{ marginLeft: "18px" }}>
              {wishlist.find((o) => o.id === prod.id) ? (
                <BsFillHeartFill
                  style={{ color: "red" }}
                  onClick={() => {
                    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: prod });
                  }}
                />
              ) : (
                <BsHeart
                  style={{ color: "red" }}
                  onClick={() => {
                    dispatch({ type: "ADD_TO_WISHLIST", payload: prod });
                  }}
                />
              )}
            </span>
          </h5>
          {prod.fastDelivery ? <p>Fast Delivery</p> : <p>5 days delivery</p>}
          <Rating rating={prod.ratings} onclick={() => {}} />
          <br />
          <div className="row mt-1">
            {cart.find((o) => o.id === prod.id) ? (
              <button
                style={{ marginTop: "8px", margin: "1px" }}
                className="btn btn-danger col-md-5"
                onClick={() => {
                  dispatch({ type: "REMOVE_FROM_CART", payload: prod });
                }}
              >
                Remove
              </button>
            ) : (
              <button
                style={{ margin: "2px" }}
                className="btn btn-info  col-md-5"
                onClick={() => {
                  dispatch({ type: "ADD_TO_CART", payload: prod });
                }}
                disabled={!prod.inStock}
              >
                {!prod.inStock ? "Not available" : "Add to cart"}
              </button>
            )}


            
            <button
              className="btn  btn-outline-warning  col-md-5"
              style={{ marginLeft: "3px" }}
              disabled={!prod.inStock} 
            >
            {/* <Link to='/buyproduct' style={{textDecoration:"none",color:"brown"}}> */}
            <Link to={{
              pathname:`/buyproduct/${prod.name}`,
              state:prod
            }}  style={{textDecoration:"none",color:"brown"}} disabled={!prod.inStock} >
              Buy now</Link>
            </button>
          
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
