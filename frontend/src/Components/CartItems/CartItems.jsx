import React, { useEffect, useState } from 'react';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';

export const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.user_id) return;
    fetch(`${import.meta.env.VITE_API_BASE}/cart/${user.user_id}/`)
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error("Error loading cart", err))
      .finally(() => setLoading(false));
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/remove-from-cart/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.user_id, product_id: productId })
      });
      const result = await res.json();
      if (res.ok) {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
      } else {
        console.error(result.error || "Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing item from cart", err);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) =>
      sum + parseFloat(item.product.price) * item.quantity, 0
    ).toFixed(2);
  };

  if (!user) return <p>Please log in to view your cart.</p>;
  if (loading) return <p>Loading cart...</p>;
  if (!cartItems.length) return <p>Your cart is empty.</p>;

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map(({ product, quantity }) => (
        <div key={product.id} className="cartitems-format cartitems-format-main">
          <img src={product.image} alt={product.name} className='carticon-product-icon' />
          <p>{product.name}</p>
          <p>${product.price}</p>
          <p>{quantity}</p>
          <p>${(parseFloat(product.price) * quantity).toFixed(2)}</p>
          <img
            className='cartitems-remove-icon'
            src={remove_icon}
            alt="Remove"
            onClick={() => removeFromCart(product.id)}
          />
        </div>
      ))}
      <hr />
      <div className="cartitems-total">
        <h3>Total: ${getTotal()}</h3>
      </div>
    </div>
  );
};

export default CartItems;