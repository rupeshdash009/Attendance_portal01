
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Seatbooking from './component/Seatbooking';
import Attendance from "./component/Attendance";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import StudentProfile from "./component/profile/StudentProfile ";
import TeacherDashboard from "./component/TeacherDashboard";



function App() {
 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/seatbooking" element={<Seatbooking />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/TeacherDashboard" element={<TeacherDashboard />} />

       

        

      </Routes>
    </Router>
  );
}

export default App;
