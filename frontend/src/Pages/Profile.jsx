import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CSS/Profile.css";

const apiBase = process.env.REACT_APP_API_BASE;

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    fetch(`${apiBase}/orders/${user.id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch(() => setError("Failed to load orders"));
  }, [user]);

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Please login to view profile.</p>;
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout}>Logout</button>

      <hr style={{ margin: "40px 0" }} />

      <h2>Order History</h2>

      {error && <p className="order-error">{error}</p>}
      {!orders.length && !error && <p>No orders found.</p>}

      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id}</h3>
            <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
            <p>Status: <span className={order.is_paid ? "paid" : "pending"}>{order.is_paid ? "Paid" : "Pending"}</span></p>

            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <p>{item.product.name}</p>
                    <p>Qty: {item.quantity} × ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
