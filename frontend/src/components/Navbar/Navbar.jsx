import { Link } from 'react-router-dom';
import '../../styles/navbar.css';
import { useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Pursuit Athletics</Link>
      </div>

      <form onSubmit={handleSearchSubmit} className="navbar-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <ul className="navbar-links">
        <li><Link to="/products">Shop</Link></li>
        <li><Link to="/track">Track Order</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
