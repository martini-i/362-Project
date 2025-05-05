const apiBase = process.env.REACT_APP_API_BASE;
const handleLogin = async () => {
  try {
    const res = await fetch(`${apiBase}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });
    const data = await res.json();
    if (res.ok) {
      // ✅ Save both user and token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Login successful!');
    } else {
      setMessage(data.error || 'Login failed');
    }
  } catch (err) {
    setMessage('Error logging in');
  }
};
