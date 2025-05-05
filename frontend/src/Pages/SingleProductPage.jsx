import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const apiBase = process.env.REACT_APP_API_BASE;

export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/products/${id}/`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Error loading product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return <ProductDisplay product={product} />;
}