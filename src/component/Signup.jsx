import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    program: "",
    year: "",
    semester: "",
    rollNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://attendance-backend12-production.up.railway.app/api/auth/signup", user);
      console.log("data", response.data);
      alert("Signup Successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Program Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Program</label>
            <select
              name="program"
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Program</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
            </select>
          </div>

          {/* Year Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Year</label>
            <select
              name="year"
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
            </select>
          </div>

          {/* Semester Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Semester</label>
            <select
              name="semester"
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              placeholder="Enter Roll Number"
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
