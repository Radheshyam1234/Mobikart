import React from "react";
import {CartState} from '../context/Context'
import Rating from "./Rating";
const Filter = () => {
  // const [rate, setRate] = useState(3);
  const{FilterState:{byFastDelivery,byStock,sort,byRating,search},FilterDispatch} = CartState()
  console.log(search)
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <form>
          <label htmlFor="Ascending">
            Low to High
            <input type="radio" id="Ascending" name="optradio" 
            onChange={()=>{
              FilterDispatch({
                type:"FILTER_BY_PRICE",
                payload:"ascending"

              })
            }}
            checked ={sort=== "ascending" ? true : false}
            />
          </label>
          <br />

          <label htmlFor="Descending">
            High to Low
            <input type="radio" id="Descending" name="optradio"
            onChange={()=>{
              FilterDispatch({
                type:"FILTER_BY_PRICE",
                payload:"descending"

              })
            }}
           checked ={sort=== "descending" ? true : false} 
            />
          </label>
        </form>
      </span>

      <span>
        <label htmlFor="outOfStock">
          Include out of stock
          <input type="checkbox" id="outOfStock" 
          onChange={()=>{
            FilterDispatch({
              type:"FILTER_BY_STOCK",
            
            })
          }}
          checked={byStock}
          />
        </label>
      </span>

      <span>
        <label htmlFor="fastDelivery">
          Fast Delivery
          <input type="checkbox" id="fastdelivery" 
          onChange={()=>{
            FilterDispatch({
              type:"FILTER_BY_DELIVERY",
            
            })
          }}
          checked={byFastDelivery}
          />
        </label>
      </span>

      <span>
        <label style={{ padding: "10px" }}>Rating</label>
        <Rating
          rating={byRating}
          onclick={(i) => {
            FilterDispatch({
              type:"FILTER_BY_RATING",
              payload:i+1
            });
          }}
          style={{ cursor: "pointer" }}
        />
      </span>
      <button className="btn btn-light"
      onClick={()=>{
        FilterDispatch({
          type:"CLEAR_FILTERS"
        })
      }}
      >Clear Filters</button>
    </div>
  );
};
export default Filter;
