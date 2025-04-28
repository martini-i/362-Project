import React, { useState } from 'react';

export const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://3.144.20.168:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Login successful! Welcome user ID: ${data.user_id}`);
        
        // 🛠 ADD THESE TWO LINES:
        localStorage.setItem('user_id', data.user_id);
        window.location.href = `/profile/${data.user_id}`;
  
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://3.144.20.168:8000/api/sign_up/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful! You can now log in.');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login / Signup</h1>
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '10px', display: 'block' }}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px', display: 'block' }}
      />
      
      <button onClick={handleLogin} style={{ marginRight: '10px' }}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};