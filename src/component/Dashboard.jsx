import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.user) {
          setUser(res.data.user); // ✅ FIX: Ensure user data is properly set
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
     
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
   
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col gap-3 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome, {user ? user.name : "Guest"} 🎉
      </h2>

      <button
        onClick={handleLogout}
        className="border border-red-400 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
