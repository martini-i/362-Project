import React, { useEffect, useState } from 'react';
import './CartItems.css';

const CartItems = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/cart/`, {
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

    fetchCart();
  }, [token]);

  const removeItem = async (productId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/cart/remove/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ product_id: productId })
      });

      if (res.ok) {
        // Refresh cart
        setItems(items.filter(item => item.product.id !== productId));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to remove item");
      }
    } catch (err) {
      console.error('Remove failed:', err);
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
        </>
      )}
    </div>
  );
};

export default CartItems;
