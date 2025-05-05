import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItems from '../Components/CartItems/CartItems';

const apiBase = process.env.REACT_APP_API_BASE;

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading, false = not logged in, true = logged in
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to check out.");
      return;
    }

    try {
      const res = await fetch(`${apiBase}/checkout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
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

  if (isLoggedIn === null) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <p>You must be logged in to view your cart.</p>
        <button onClick={() => navigate("/login")} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Login
        </button>
      </div>
    );
  }

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
