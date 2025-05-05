import React, { useEffect, useState } from 'react';

const apiBase = process.env.REACT_APP_API_BASE;

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(`${apiBase}/profile/${user.id}/`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, [user]);

  if (!user) {
    return <p className="text-center py-20">You must be logged in to view your profile.</p>;
  }

  if (!profile) {
    return <p className="text-center py-20">Loading profile...</p>;
  }

  return (
    <div className="profile-page" style={{ padding: "40px" }}>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Address:</strong> {profile.address || 'Not provided'}</p>
      <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
    </div>
  );
};

export default Profile;
