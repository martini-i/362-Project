import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems = {}, getTotalCartAmount = () => 0 } = useContext(ShopContext) || {};
  const navigate = useNavigate();

  let user;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to proceed with checkout.");
      return navigate("/login");
    }

    const cart = Object.entries(cartItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({
        product_id: parseInt(productId),
        quantity: quantity
      }));

    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    try {
      const response = await fetch("/api/checkout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id: user.user_id })
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
