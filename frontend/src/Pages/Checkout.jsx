import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const apiBase = process.env.REACT_APP_API_BASE;

const Checkout = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token) {
      alert("Please login first.");
      return navigate("/login");
    }

    if (!cartItems.length) {
      alert("Cart is empty.");
      return;
    }

    try {
      const res = await fetch(`${apiBase}/checkout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully!");
        navigate("/");
      } else {
        alert("Checkout failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>Total Amount: ${Number(getTotalCartAmount() || 0).toFixed(2)}</p>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
