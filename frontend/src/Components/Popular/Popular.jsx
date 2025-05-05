import React, { useEffect, useState } from 'react';
import './Popular.css';
import { Item } from '../Item/Item';

export const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data));
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