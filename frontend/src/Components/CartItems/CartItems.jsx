import React, { useEffect, useState } from 'react';
import './CartItems.css';

const apiBase = process.env.REACT_APP_API_BASE;

const CartItems = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id'); // Make sure this is set at login

  const fetchCart = async () => {
    try {
      const res = await fetch(`${apiBase}/cart/${userId}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      const data = await res.json();
      setItems(data.items);
      setTotal(data.total_price);
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchCart();
    }
  }, [token, userId]);

  const removeItem = async (productId) => {
    try {
      const res = await fetch(`${apiBase}/remove-from-cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ product_id: productId, user_id: userId })
      });

      if (res.ok) {
        // Refresh cart
        fetchCart();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to remove item");
      }
    } catch (err) {
      console.error('Remove failed:', err);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${apiBase}/checkout/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }) // match your Django backend expectations
      });
  
      if (res.ok) {
        alert("Order placed successfully!");
        setItems([]);
        setTotal(0);
      } else {
        const data = await res.json();
        alert(data.error || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div className="cart-items">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <p>{item.product.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.product.price}</p>
                  <p>Total: ${item.total_price}</p>
                  <button onClick={() => removeItem(item.product.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartItems;
