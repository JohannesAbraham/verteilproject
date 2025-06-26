import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleNewUser = async () => {
    const adminPassword = prompt("Enter Admin Password:");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-admin", {
        adminPassword,
      });
      if (res.status === 200) {
        navigate("/profile", { state: { isCreatingNewUser: true } });
      }
    } catch (err) {
      alert("Invalid admin password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl pb-4 font-semibold text-center text-gray-800">Login</h2>

        <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
            onClick={handleLogin}
            className="w-full mb-3 py-2 bg-lgreen text-white rounded-lg hover:bg-green-600 transition"
        >
            Login
        </button>

        <button
            onClick={handleNewUser}
            className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
            New User
        </button>
        </div>
    </div>
    );
}

export default LoginPage;
