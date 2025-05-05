import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/Pursuit Logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className='navbar'>
      <div className="nav-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </div>

      <ul className="nav-menu">
        <li><Link to="/">Shop</Link></li>
        <li><Link to="/mens">Men</Link></li>
        <li><Link to="/womens">Women</Link></li>
        <li><Link to="/kids">Kids</Link></li>
      </ul>

      <div className="nav-login-cart">
        {user ? (
          <>
            <Link to="/profile"><button>Profile</button></Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
