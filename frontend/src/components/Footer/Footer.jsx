import { Link } from 'react-router-dom';
import '../../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>Pursuit Athletics</h3>
          <p>
            Your source for premium athletic apparel. Designed to elevate your performance.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Shop</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Pursuit Athletics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
