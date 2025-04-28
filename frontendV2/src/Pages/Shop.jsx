// import React from 'react'
// import Hero from '../Components/Hero/Hero'

// export const Shop = () => {
//   return (
//     <div>
//       <Hero/>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import Hero from '../Components/Hero/Hero';

export const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://3.144.20.168:8000/api/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <Hero /> {/* Hero stays at top */}

      <h1>Shop Products</h1>

      <div>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;