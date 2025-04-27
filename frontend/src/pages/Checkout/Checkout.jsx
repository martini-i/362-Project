import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../styles/checkout.css';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Placed:', { formData, cartItems });
    alert('Order placed successfully!');
    // Later: send data to Django backend
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
