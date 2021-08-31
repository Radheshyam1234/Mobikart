import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { CartState } from "../context/Context";
import {FaBars} from 'react-icons/fa'
import "./Navbar.css";

const Navbar = () => {
  const {
    state: { cart },
    dispatch,
    FilterDispatch
  } = CartState();




  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }




  return (
    <div className="row navbar">

      <div className=" col col-sm-1 nav-item">


              <div id="mySidebar" className="sidebar">
          <a href="javascript:void(0)" className="closebtn" onClick={()=>{closeNav()}}>×</a>
          <NavLink to='/'  >Home</NavLink>
          <NavLink to ='/cart' activeStyle={{color:"white"}}>My Cart</NavLink>
          <NavLink to='/myorders' activeStyle={{color:"white"}}>My orders</NavLink>
          <NavLink to='/mywishlist' activeStyle={{color:"white"}}>My wishlist</NavLink>
         
        </div>

        <div id="main">
          
          <span onClick={()=>{openNav()}} style={{cursor:"pointer"}}>
          <FaBars style={{color:"white"}}/>
          </span>
        </div>

    </div>

      <div className="col col-sm-3 nav-item">
        <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
          Shopping Cart
        </NavLink>
      </div>
      <div className="col col-sm-4 nav-item ">
        <input
          type="text"
          className="search"
          placeholder="Search a product"
          onChange={(e) => {
            FilterDispatch({
              type: "FILTER_BY_SEARCH",
              payload: e.target.value
            });
          }}
        />
      </div>
      <div className=" col col-sm-4 nav-item">
        <div className="dropdown dropleft">
          <button
            className="btn "
            style={{
              backgroundColor: "#353b48",
              color: "white",
              fontSize: "22px"
            }}
            type="button"
            data-toggle="dropdown"
          >
            <FaShoppingCart />
            <span className="badge">{cart.length}</span>
          </button>
          <ul className="dropdown-menu">
            {cart.length > 0 ? (
              <>
                <div className="cart-item-box">
                  {cart.map((product) => {
                    return (
                      <div key={product.id} className="cart-item">
                        <img
                          className="cart-item-image"
                          src={product.image}
                          alt={product.name}
                        />

                        <div className="cart-item-details">
                          <span>{product.name}</span>
                          <span>₹ {product.price}</span>
                        </div>
                        <MdDelete
                          fontSize="35px"
                          style={{ cursor: "pointer", color: "darkred" }}
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: product
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                  <NavLink to="/cart" style={{ textDecoration: "none" }}>
                    <button
                      className="btn btn-warning btn-block"
                      style={{ marginTop: "15px" }}
                    >
                      Go to cart
                    </button>
                  </NavLink>
                </div>
              </>
            ) : (
              <span style={{ padding: "10px" }}>Cart is empty</span>
            )}
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
