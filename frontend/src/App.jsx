import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Homepage from './pages/Homepage/Homepage';
import Products from './pages/Products/Products';
import Checkout from './pages/Checkout/Checkout';
import Cart from './pages/Cart/Cart';
import './styles/app.css';

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
