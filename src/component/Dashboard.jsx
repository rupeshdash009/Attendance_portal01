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
        console.error("No token found, redirecting to login");
        navigate("/login");
        return;
      }
    
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` },
        });
    
        console.log("Fetched user data:", res.data);
        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    

    fetchUser();
  }, [navigate]);




  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
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
