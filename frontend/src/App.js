import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import  ShopCategory  from './Pages/ShopCategory';
//import  Product  from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import SingleProductPage from './Pages/SingleProductPage';
import Profile from './Pages/Profile';
import OrderHistory from './Pages/OrderHistory';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="mens" />} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="womens" />} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path='/product/:id' element={<SingleProductPage />} />  {/* FIXED */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<OrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
