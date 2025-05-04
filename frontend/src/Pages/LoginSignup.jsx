import React, { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setMessage('Login successful!');
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      setMessage('Error logging in');
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/sign_up/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful!');
      } else {
        setMessage(data.error || 'Signup failed');
      }
    } catch (err) {
      setMessage('Error signing up');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container side-by-side">

        {/* Login Box */}
        <div className="loginsignup-box">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>

        {/* Sign Up Box */}
        <div className="loginsignup-box">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input
              type="text"
              placeholder="Username"
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
          </div>
          <button onClick={handleSignup}>Sign Up</button>
        </div>

      </div>
      {message && <p className="loginsignup-message">{message}</p>}
    </div>
  );
};