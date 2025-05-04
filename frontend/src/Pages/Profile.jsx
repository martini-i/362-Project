import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.user_id) {
      setError("User not logged in");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE}/profile/${user.user_id}/`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => setError("Error loading profile"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">User Profile</h1>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone_number || 'Not set'}</p>
      <p><strong>Bio:</strong> {profile.bio || 'No bio yet'}</p>
    </div>
  );
}