import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiBase = process.env.REACT_APP_API_BASE;

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    fetch(`${apiBase}/orders/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setOrders(data.orders))
      .catch(() => setError("Failed to load orders"));
  }, [navigate]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!orders.length) return <p className="p-4">No orders found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow-sm">
          <h2 className="font-semibold mb-2">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">Placed: {new Date(order.created_at).toLocaleString()}</p>
          <p className="text-sm text-gray-600 mb-2">Total: ${order.total}</p>
          <p className={`text-sm font-medium ${order.is_paid ? 'text-green-600' : 'text-yellow-600'}`}>
            {order.is_paid ? 'Paid' : 'Pending Payment'}
          </p>
          <div className="mt-3 divide-y">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-2">
                <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p>{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
