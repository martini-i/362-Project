import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import AuthContextProvider from './Context/AuthContext'; // ✅ ADD THIS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
