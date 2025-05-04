import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.user_id) {
      setError("You must be logged in.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE}/orders/${user.user_id}/`)
      .then(res => res.json())
      .then(setOrders)
      .catch(() => setError("Failed to load orders"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded">
          <h2 className="font-semibold mb-2">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">Placed: {new Date(order.created_at).toLocaleString()}</p>
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
              <div>
                <p>{item.name}</p>
                <p className="text-sm">Qty: {item.quantity} × ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}