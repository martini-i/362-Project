import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import { Item } from '../Item/Item';

const apiBase = process.env.REACT_APP_API_BASE;

export const NewCollections = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${apiBase}/products/`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch new collection products", err));
  }, []);

  return (
    <div className='new-collections'>
      <h1>New Collections</h1>
      <hr />
      <div className="collections">
        {products.length > 0 ? (
          products.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
