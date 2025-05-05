import React, { useEffect, useState } from 'react';
import './Popular.css';
import { Item } from '../Item/Item';

const apiBase = process.env.REACT_APP_API_BASE;

export const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${apiBase}/products/`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  return (
    <div className='popular'>
      <h1>Popular Items</h1>
      <hr />
      <div className="popular-item">
        {products.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
