import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCreatingNewUser = location.state?.isCreatingNewUser;

  const [profile, setProfile] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isCreatingNewUser) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProfile(res.data.user))
        .catch((err) => console.error(err));
    }
  }, [isCreatingNewUser]);

  const handleCreateUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/create-user", newUser);
      alert("User created successfully!");
      navigate("/"); // Go back to login
    } catch (err) {
      alert("Failed to create user");
    }
  };

  if (isCreatingNewUser) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl pb-4 font-semibold text-center mb-6 text-gray-800">Create New User</h2>

            <input
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
                onClick={handleCreateUser}
                className="w-full py-2 bg-lgreen text-white rounded-lg hover:bg-green-300 transition"
            >
                Create
            </button>
            </div>
        </div>
        );

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">User Profile</h2>

        {profile ? (
            <div className="space-y-4 text-gray-700">
            <p>
                <span className="font-medium">Username:</span> {profile.username}
            </p>
            <p>
                <span className="font-medium">Email:</span> {profile.email}
            </p>
            </div>
        ) : (
            <p className="text-center text-gray-500">Loading profile...</p>
        )}
        </div>
    </div>
    );
}

export default ProfilePage;
