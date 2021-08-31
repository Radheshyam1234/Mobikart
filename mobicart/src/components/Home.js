import React from "react";
import { CartState } from "../context/Context";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import "./Home.css";
const Home = () => {
  const {
    state: { products },
    FilterState: { sort, byRating, search, byStock, byFastDelivery }
  } = CartState();
  //console.log(search);

  const ModifiedProducts = () => {
    let FilteredProducts = products;

    if (sort) {
      FilteredProducts = FilteredProducts.sort((a, b) =>
        sort === "ascending"
          ? Number(a.price.replace(",", "")) - Number(b.price.replace(",", ""))
          : Number(b.price.replace(",", "")) - Number(a.price.replace(",", ""))
      );
    }

    if (!byStock) {
      FilteredProducts = FilteredProducts.filter((prod) => prod.inStock);
    }
    if (byFastDelivery) {
      FilteredProducts = FilteredProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      FilteredProducts = FilteredProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (search) {
      FilteredProducts = FilteredProducts.filter((prod) =>
        prod.name.toLowerCase().includes(search)
      );
    }

    return FilteredProducts;
  };

  return (
    <div className="home">
      <Filter />
      <div className="product-container">
        {ModifiedProducts().map((prod) => {
          return <ProductCard prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};
export default Home;
