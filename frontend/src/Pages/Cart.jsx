import React from 'react';
import CartItems from '../Components/CartItems/CartItems';

export const Cart = () => {
  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in to check out.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/checkout/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.user_id })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Order placed successfully!");
        window.location.reload();
      } else {
        alert(data.error || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout error", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <CartItems />
      <div className="text-center py-4">
        <button onClick={handleCheckout} className="bg-indigo-600 text-white px-6 py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;