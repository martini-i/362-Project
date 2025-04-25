import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../styles/cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)} x {item.quantity}</p>
              <div className="cart-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
