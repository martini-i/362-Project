import React, { createContext, useState, useEffect } from "react";
import { apiFetch } from "../lib/api"; // Wrapper around fetch with VITE_API_BASE_URL

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch products and initialize cart
  useEffect(() => {
    apiFetch("/api/products/")
      .then(data => {
        setProducts(data);
        const cart = {};
        data.forEach(product => {
          cart[product.id] = 0;
        });
        setCartItems(cart);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const getTotalCartAmount = () => {
    return products.reduce((total, product) => {
      const quantity = cartItems[product.id] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
