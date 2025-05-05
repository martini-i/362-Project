import React, { useContext, useState } from 'react';
import './CSS/AllProducts.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

export const AllProducts = () => {
  const { products } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("default");

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

  const getFullImageUrl = (image) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `http://18.117.73.142:8000${image}`;
  };

  const sortedProducts = sortProducts(products);

  return (
    <div className='shop-category'>
      <h1 style={{ textAlign: "center", margin: "40px 0" }}>All Products</h1>

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {products?.length || 0}</span> products
        </p>
        <div className="shopcategory-sort">
          Sort by 
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
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
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={getFullImageUrl(item.image)} 
              price={item.price} 
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default AllProducts;
