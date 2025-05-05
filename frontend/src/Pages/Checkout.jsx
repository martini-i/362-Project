import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const apiBase = process.env.REACT_APP_API_BASE;

const Checkout = () => {
  const { cartItems = {}, getTotalCartAmount = () => 0 } = useContext(ShopContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to proceed with checkout.");
      return navigate("/login");
    }

    const hasItems = Object.values(cartItems).some(qty => qty > 0);
    if (!hasItems) {
      alert("Cart is empty.");
      return;
    }

    try {
      const response = await fetch(`${apiBase}/checkout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
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
