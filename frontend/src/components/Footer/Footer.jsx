import { Link } from 'react-router-dom';
const Footer = () => {
    return (
      <footer className="bg-black text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-2">Pursuit Athletics</h3>
            <p className="text-sm text-gray-400">
              Your source for premium athletic apparel. Designed to elevate your performance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/cart" className="hover:underline">Cart</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Pursuit Athletics. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  