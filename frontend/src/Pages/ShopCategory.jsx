import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

export const ShopCategory = (props) => {
  const { products } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("default");

  const categoryName = props.category.trim().toLowerCase();

  const filteredProducts = products.filter(
    (item) => item.category?.trim().toLowerCase() === categoryName
  );

  const sortProducts = (products) => {
    let sorted = [...products];
    if (sortOption === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      sorted.sort((a, b) => b.id - a.id);
    }
    return sorted;
  };

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className="shop-category">
      <img src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {sortedProducts.length}</span> products
        </p>
        <div className="shopcategory-sort">
          Sort by 
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
