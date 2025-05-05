import React, { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import './CSS/ShopCategory.css';
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const SearchResults = () => {
  const { products } = useContext(ShopContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    if (!query) return [];

    return products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) // optional: search by category too
    );
  }, [products, query]);

  return (
    <div className="shop-category">
      <h1 style={{ textAlign: "center", margin: "40px 0" }}>
        Search Results for "{query}"
      </h1>

      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} image={item.image} price={item.price} />
          ))
        ) : (
          <p style={{ textAlign: "center", margin: "20px 0" }}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
