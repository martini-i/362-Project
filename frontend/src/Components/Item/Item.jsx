import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const Item = (props) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const imageUrl = props.image.startsWith("http") ? props.image : `${backendURL}${props.image}`;

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} onClick={handleClick}>
        <img src={imageUrl} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        ${props.price}
      </div>
    </div>
  );
};

export default Item;
