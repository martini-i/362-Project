import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  // Helper to make sure image URL works
  const getFullImageUrl = (image) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `http://18.117.73.142:8000${image}`;
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={getFullImageUrl(product.image)} alt={product.name} />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={getFullImageUrl(product.image)} alt={product.name} />
        </div>
      </div>
      
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price">
            ${product.price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description || "No description available."}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>Add To Cart</button>
        <p className='productdisplay-right-category'>
          <span>Category :</span> {product.category || "Uncategorized"}
        </p>
        <p className='productdisplay-right-category'>
          <span>Tags :</span> Athletic Gear
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
