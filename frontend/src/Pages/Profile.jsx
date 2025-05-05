import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({ email: '', phone: '', bio: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE}/profile/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setProfile({
        email: data.email || '',
        phone: data.phone || '',
        bio: data.bio || ''
      }))
      .catch(() => setError("Error loading profile"));
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (res.ok) {
        setMessage("Profile updated successfully!");
      } else {
        const data = await res.json();
        setMessage(data.error || "Update failed");
      }
    } catch {
      setMessage("Something went wrong.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label>Email:</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="email"
            value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            value={profile.phone}
            onChange={e => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="3"
            value={profile.bio}
            onChange={e => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
