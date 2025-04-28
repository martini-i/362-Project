import React, { useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../styles/products.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);



  //const [searchQuery, setSearchQuery] = useState('');

  // const products = [
  //   { id: 1, name: 'Performance Hoodie', price: 59.99 },
  //   { id: 2, name: 'Flex Fit Shorts', price: 39.99 },
  //   { id: 3, name: 'Endurance Tee', price: 29.99 }
  // ];



  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">Image</div>
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
