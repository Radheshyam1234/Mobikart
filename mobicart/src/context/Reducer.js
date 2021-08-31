export const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }]
        };
  
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((o) => o.id !== action.payload.id)
        };
  
      case "ADD_TO_WISHLIST":
        return {
          ...state,
          wishlist: [...state.wishlist, { ...action.payload }]
        };

        case "REMOVE_ALL_FROM_CART":
          return{
            ...state,
            cart:[]
          }
  
      case "REMOVE_FROM_WISHLIST":
        return {
          ...state,
          wishlist: state.wishlist.filter((o) => o.id !== action.payload.id)
        };

        case "ADD_TO_ORDERED_PRODUCTS_VIA_CART":
          return{
            ...state,
            myorders:state.myorders.concat(action.payload)
          }

          case "ADD_TO_ORDERED_PRODUCTS_VIA_INDIVIDUALLY":
            return{
              ...state,
              myorders:[...state.myorders,{...action.payload}]
            }
  
      case "CHANGE_QTY":
        return {
          ...state,
          cart: state.cart.filter((o) =>
            o.id === action.payload.id ? (o.qty = action.payload.qty) : o.qty
          )
        };
      default:
        return state;
    }
  };
  
  export const FilterReducer = (state, action) => {
    switch (action.type) {
      case "FILTER_BY_PRICE":
        return {
          ...state,
          sort: action.payload
        };
      case "FILTER_BY_RATING":
        return {
          ...state,
          byRating: action.payload
        };
  
      case "FILTER_BY_STOCK":
        return {
          ...state,
          byStock: !state.byStock
        };
      case "FILTER_BY_DELIVERY":
        return {
          ...state,
          byFastDelivery: !state.byFastDelivery
        };
  
      case "FILTER_BY_SEARCH":
        return {
          ...state,
          search: action.payload
        };
      case "CLEAR_FILTERS":
        return {
          byFastDelivery: false,
          byStock: false,
          byRating: 0,
          search: "",
          sort: ""
        };
  
      default:
        return state;
    }
  };
  