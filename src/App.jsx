
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";

// import Features from "./component/Features";
// import SeatBooking from "./component/SeatBooking";

// import { Seatbooking } from "./component/Seatbooking";
import Seatbooking from './component/Seatbooking';
import BookingForm from "./component/BookingForm";
// import { Register } from "./component/Register";
import Attendance from "./component/Attendance";
import LoginPage from "./component/loginPage";

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
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/loginpage" element={<LoginPage />} />
        
        
        {/* <Route path="/loginDialog" element={<LoginDialog/>} /> */}

        

      </Routes>
    </Router>
  );
}

export default App;
