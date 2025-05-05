import React, { useEffect, useState, useCallback } from 'react';
import './CartItems.css';

const apiBase = process.env.REACT_APP_API_BASE;

const CartItems = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id'); // Ensure this is saved on login

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${apiBase}/cart/${userId}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      const data = await res.json();
      setItems(data.items || []);  // ✅ Fallback to empty array
      setTotal(data.total_price || 0); // ✅ Fallback to 0
    } catch (err) {
      console.error('Failed to load cart:', err);
      setItems([]);  // ✅ On error, clear cart
      setTotal(0);
    }
  }, [token, userId]); // ✅ Include in deps so no ESLint warnings

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${apiBase}/cart/${userId}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          }
        });
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Failed to load cart:', err);
      }
    };
  
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
        fetchCart(); // Refresh after removing
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
        body: JSON.stringify({ user_id: userId })
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
              <li key={item.product.id}>
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
