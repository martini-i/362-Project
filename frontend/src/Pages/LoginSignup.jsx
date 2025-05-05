import React, { useState, useContext } from 'react';
import './CSS/LoginSignup.css';
import { AuthContext } from '../Context/AuthContext';

const apiBase = process.env.REACT_APP_API_BASE;

const LoginSignup = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${apiBase}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('user_id', data.user.id);
        login(data.user);
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
      const res = await fetch(`${apiBase}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('Signup successful! Please login now.');
        setLoginData({ username: signupData.username, password: '' });
      } else {
        setMessage(data.error || 'Signup failed');
      }
    } catch (err) {
      setMessage('Error signing up');
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container side-by-side">

        <div className="loginsignup-box">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input type="text" name="username" placeholder="Username" value={loginData.username} onChange={handleLoginChange} />
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>

        <div className="loginsignup-box">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input type="text" name="username" placeholder="Username" value={signupData.username} onChange={handleSignupChange} />
            <input type="email" name="email" placeholder="Email Address" value={signupData.email} onChange={handleSignupChange} />
            <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} />
          </div>
          <button onClick={handleSignup}>Sign Up</button>
        </div>

      </div>

      {message && <p style={{ marginTop: "20px", textAlign: "center" }}>{message}</p>}
    </div>
  );
};

export default LoginSignup;
