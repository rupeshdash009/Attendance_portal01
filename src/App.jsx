import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
// import Features from "./component/Features";
// import SeatBooking from "./component/SeatBooking";
import Login from "./component/Login/Login";
// import { Seatbooking } from "./component/Seatbooking";
import Seatbooking from './component/Seatbooking';
import BookingForm from "./component/BookingForm";
// import { Register } from "./component/Register";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/features" element={<Features />} /> */}
        <Route path="/seatbooking" element={<Seatbooking />} />
        <Route path="/bookingForm" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
