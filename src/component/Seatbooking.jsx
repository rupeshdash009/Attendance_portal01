import React, { useState } from "react";
import { motion } from "framer-motion";
import BookingForm from "./BookingForm";

const SeatBooking = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [course, setCourse] = useState("BCA");

  const totalSeats = course === "BCA" ? 30 : 60;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const handleSeatSelection = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSelectedSeat(seat);
      setShowForm(true);
    }
  };

  const handleBooking = (formData) => {
    setBookedSeats([...bookedSeats, selectedSeat]);
    setShowForm(false);
    setSelectedSeat(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-indigo-100 to-indigo-200 p-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Seat Booking</h1>

        {/* Course Selection */}
        <div className="mb-6">
          <label htmlFor="course" className="text-lg font-semibold text-gray-700">Select Course</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-4 mt-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="BCA">BCA (30 Seats)</option>
            <option value="BBA">BBA (60 Seats)</option>
          </select>
        </div>

        {/* Seats Grid */}
        <div className="grid grid-cols-6 md:grid-cols-10 gap-6">
          {seats.map((seat) => (
            <motion.button
              key={seat}
              onClick={() => handleSeatSelection(seat)}
              disabled={bookedSeats.includes(seat)}
              className={`w-16 h-16 rounded-lg text-white font-semibold flex items-center justify-center text-xl
              ${bookedSeats.includes(seat) ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} 
              ${selectedSeat === seat ? "ring-4 ring-indigo-500 scale-110" : ""} transition-all ease-in-out duration-300`}
              whileTap={{ scale: 0.95 }}
            >
              {seat}
            </motion.button>
          ))}
        </div>

        {/* Booking Form Modal */}
        {showForm && (
          <BookingForm seat={selectedSeat} onClose={() => setShowForm(false)} onSubmit={handleBooking} />
        )}
      </div>
    </div>
  );
};

export default SeatBooking;
