import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState("student");
  const [phoneOrId, setPhoneOrId] = useState(""); // ✅ Updated variable for students & teachers
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Predefined Teacher Credentials (Only for local validation)
  const teacherCredentials = {
    teacher123: "password123",
    teacher456: "securepass456",
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (userType === "teacher") {
      // ✅ Teacher login validation
      if (teacherCredentials[phoneOrId] === password) {
        alert("Teacher login successful!");
        navigate("/attendance");
      } else {
        alert("Invalid Teacher ID or Password!");
      }
      return;
    }

    // ✅ Student Signup/Login API Call
    if (isSignup && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const endpoint = isSignup ? "signup" : "login"; // Dynamically choose API endpoint
      const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        phone: phoneOrId, // ✅ Send phone number for student login/signup
        password,
      });

      alert(isSignup ? "Signup successful! Please log in." : "Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="bg-white bg-opacity-30 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96 max-w-full border border-white/40 relative"
      >
        <button 
          className="absolute top-4 right-4 text-gray-700 text-2xl font-bold cursor-pointer" 
          onClick={() => navigate("/")}
        >
          ×
        </button>

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {isSignup && userType === "student" ? "Student Signup" : userType === "student" ? "Student Login" : "Teacher Login"}
        </h2>

        {/* User Type Selection */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all shadow-lg ${userType === "student" ? "bg-white text-indigo-500" : "bg-gray-300 hover:bg-gray-400"}`}
            onClick={() => {
              setUserType("student");
              setIsSignup(false); 
            }}
          >
            Student
          </button>
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all shadow-lg ${userType === "teacher" ? "bg-white text-indigo-500" : "bg-gray-300 hover:bg-gray-400"}`}
            onClick={() => {
              setUserType("teacher");
              setIsSignup(false);
            }}
          >
            Teacher
          </button>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="text"
            placeholder={userType === "teacher" ? "Enter Teacher ID" : "Enter Phone Number"}
            className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={phoneOrId}
            onChange={(e) => setPhoneOrId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && userType === "student" && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <button type="submit" className="w-full bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-indigo-600 transition">
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-gray-700 font-medium">Forgot Password?</a>
        </div>

        {/* Toggle Between Login & Signup (Only for Students) */}
        {userType === "student" && (
          <p className="text-center mt-4 text-gray-800">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-indigo-600 font-bold">
              {isSignup ? "Login" : "Signup"}
            </button>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Auth;
