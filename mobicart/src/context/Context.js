import React, { useContext, useReducer, useEffect } from "react";
import { createContext } from "react";
import { cartReducer, FilterReducer } from "./Reducer";
import { products } from "../components/Product";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    wishlist: localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [],
      myorders:localStorage.getItem("myorders")
      ?JSON.parse(localStorage.getItem("myorders"))
      :[]
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    localStorage.setItem("myorders", JSON.stringify(state.myorders));

  }, [state]);

  const [FilterState, FilterDispatch] = useReducer(FilterReducer, {
    byFastDelivery: false,
    byStock: false,
    byRating: 0,
    search: "",
    sort: ""
  });

  return (
    <Cart.Provider value={{ state, dispatch, FilterState, FilterDispatch }}>
      {children}
    </Cart.Provider>
  );
};
export default Context;

export const CartState = () => {
  return useContext(Cart);
};
