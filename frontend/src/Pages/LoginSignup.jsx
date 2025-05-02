import React, { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="loginsignup">
      <div className="loginsignup-container side-by-side">

        {/* Login Box */}
        <div className="loginsignup-box">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
          </div>
          <button>Login</button>
          <p>
          </p>
        </div>

        {/* Sign Up Box */}
        <div className="loginsignup-box">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
          </div>
          <div className="loginsignup-bottom">
            <button>Sign Up</button>
            <div className="loginsignup-agree">
              <input type="checkbox"/>
              <p> By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
          </div>
          <p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
