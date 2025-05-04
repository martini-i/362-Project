import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from '../lib/api';// small wrapper around fetch that prepends VITE_API_BASE_URL

// Basic spinner; swap with your own component if you have one
function Spinner({ children }) {
  return (
    <div className="flex items-center justify-center py-12 text-lg font-medium animate-pulse">
      {children}
    </div>
  );
}

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch catalog once on mount
  useEffect(() => {
    apiFetch("/products/")
      .then(setItems)
      .catch(err => setError(err.message || "Error fetching products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner>Loading products…</Spinner>;
  if (error)   return <p className="p-4 text-red-600">{error}</p>;
  if (!items.length) return <p className="p-4">No products available yet.</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {items.map(p => (
        <article
          key={p.id}
          className="border rounded-2xl shadow hover:shadow-lg transition bg-white p-4 flex flex-col"
        >
          {p.image && (
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
          )}
          <h3 className="font-semibold mb-1 line-clamp-1">{p.name}</h3>
          <p className="text-sm text-gray-600 flex-grow line-clamp-3 mb-3">
            {p.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold">${p.price}</span>
            <Link
              to={`/product/${p.id}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View →
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
