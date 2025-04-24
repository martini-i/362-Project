import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <div className="text-2xl font-bold tracking-tight">
        <Link to="/">Pursuit Athletics</Link>
      </div>
      <ul className="flex items-center gap-6 text-sm font-medium">
        <li>
          <Link to="/shop" className="hover:text-gray-600">
            Shop
          </Link>
        </li>
        <li>
          <Link to="/track" className="hover:text-gray-600">
            Track Order
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-600">
            Login
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-gray-600">
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
