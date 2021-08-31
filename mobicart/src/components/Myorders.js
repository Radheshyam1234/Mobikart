import React,{useEffect}from 'react'
import { CartState } from "../context/Context";
import {IoCheckmarkDoneCircle} from 'react-icons/io5'
import Rating from "./Rating";
import './Myorders.css'


const Myorders = () => {
    const {
        state: {myorders } } = CartState();
    useEffect(()=>{
        console.log(myorders)
    })
    return (
        <div className="orders-home">

{myorders.length > 0 ? (
        <div className="cart-product-container">
          <ul className="list-group">
            {myorders.map((prod) => {
              return (
                <li key={prod.name*Math.random()+Math.random()} className="list-group-item">
                  <div className="row">
                    <img src={prod.image} alt={prod.name} />
                    <h5 className="col">{prod.name}</h5>
                    <h4 className="col">₹ {prod.price}</h4>
                    <h5 className="col ">
                      <Rating rating={prod.ratings} onclick={() => {}} />
                    </h5>
                    <IoCheckmarkDoneCircle className="col " style={{color:"green",fontSize:"30px"}}/>
                    
                    {/* <MdDelete
                      
                    /> */}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="cart-product-container">
          <h2>There is no item .. Go and buy...</h2>
        </div>
      )}




            
        </div>
    )
}

export default Myorders
