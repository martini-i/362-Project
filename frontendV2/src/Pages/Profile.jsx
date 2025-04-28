import React from 'react';
import { useParams } from 'react-router-dom';

export const Profile = () => {
  const { user_id } = useParams(); // 🧠 gets user_id from the URL like /profile/2

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to your Profile!</h1>
      <p>User ID: {user_id}</p>

      <button
        onClick={() => {
          localStorage.removeItem('user_id'); // clear session
          window.location.href = '/login'; // redirect back to login
        }}
        style={{ marginTop: '20px' }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;