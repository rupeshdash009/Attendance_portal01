import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        console.log(data);
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType, fullName, rollNumber, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully!");
        console.log(data);
        setIsSignUp(false);
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white bg-opacity-30 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96 max-w-full border border-white/40 relative">
        <button className="absolute top-4 right-4 text-gray-700 text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>×</button>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">{isSignUp ? "Sign Up" : userType === "student" ? "Student Login" : "Teacher Login"}</h2>
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all shadow-lg ${userType === "student" ? "bg-white text-indigo-500" : "bg-gray-300 hover:bg-gray-400"}`}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all shadow-lg ${userType === "teacher" ? "bg-white text-indigo-500" : "bg-gray-300 hover:bg-gray-400"}`}
            onClick={() => setUserType("teacher")}
          >
            Teacher
          </button>
        </div>
        {isSignUp ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            {userType === "student" && (
              <>
                <input type="text" placeholder="Full Name" className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input type="text" placeholder="Roll Number" className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
              </>
            )}
            <input type="email" placeholder="Email" className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit" className="w-full bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-indigo-600 transition">Sign Up</button>
            <div className="text-center mt-4">
              <a href="#" className="text-gray-700 font-medium" onClick={() => setIsSignUp(false)}>Already have an account? Login</a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full p-4 bg-white bg-opacity-20 border rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="w-full bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-indigo-600 transition">Login</button>
          </form>
        )}
        <div className="text-center mt-4">
          {!isSignUp && <a href="#" className="text-gray-700 font-medium">Forgot Password?</a>}
        </div>
        <div className="text-center mt-2">
          {!isSignUp && (
            <a href="#" className="text-gray-700 font-medium" onClick={() => setIsSignUp(true)}>Create an Account</a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;