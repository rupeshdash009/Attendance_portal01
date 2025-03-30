import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const SeatBooking = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [course, setCourse] = useState("BCA");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    twelfthPassoutYear: "",
    percentage12th: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [eligibilityError, setEligibilityError] = useState("");
  const [passoutYearError, setPassoutYearError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalSeats = course === "BCA" ? 30 : 60;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings?course=${course}`);
        if (response.data && Array.isArray(response.data)) {
          setBookedSeats(response.data.map((seat) => seat.seat));
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };
    fetchBookedSeats();
  }, [course]);

  const handleSeatSelection = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSelectedSeat(seat);
      setShowForm(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();

    if (formData.twelfthPassoutYear > currentYear) {
      setPassoutYearError("The passout year cannot be in the future.");
      return;
    }
    setPassoutYearError("");

    if (formData.percentage12th < 45) {
      setEligibilityError("Sorry, you are not eligible for seat booking.");
      return;
    }
    setEligibilityError("");

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/bookings/book-seat", {
        ...formData,
        seat: selectedSeat,
        course,
      });
      console.log("seatbooked", response.data);
      if (response.status === 201) {
        setBookedSeats([...bookedSeats, selectedSeat]);
        setShowForm(false);
        setSelectedSeat(null);
      } else {
        setError("Unexpected server response.");
      }
    } catch (error) {
      console.error("Error booking seat:", error);
      setError("email is already exits");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Seat Booking</h1>
        <div className="mb-6">
          <label htmlFor="course" className="text-lg font-semibold">Select Course</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-4 mt-2 rounded-md border-2"
          >
            <option value="BCA">BCA (30 Seats)</option>
            <option value="BBA">BBA (60 Seats)</option>
          </select>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-6">
          {seats.map((seat) => (
            <motion.button
              key={seat}
              onClick={() => handleSeatSelection(seat)}
              disabled={bookedSeats.includes(seat)}
              className={`w-16 h-16 rounded-lg text-white font-semibold flex items-center justify-center text-xl
              ${bookedSeats.includes(seat) ? "bg-red-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} 
              ${selectedSeat === seat ? "ring-4 ring-indigo-500 scale-110" : ""} transition-all`}
              whileTap={{ scale: 0.95 }}
            >
              {seat}
            </motion.button>
          ))}
        </div>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
              <button onClick={() => setShowForm(false)} className="absolute top-2 right-2 text-gray-600 text-2xl">×</button>
              <h2 className="text-2xl font-bold mb-4">Book Seat {selectedSeat}</h2>
              {eligibilityError && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-md">{eligibilityError}</div>}
              {passoutYearError && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-md">{passoutYearError}</div>}
              <form onSubmit={handleBooking} className="space-y-3">
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded-md" required />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded-md" required />
                <input type="text" name="twelfthPassoutYear" placeholder="12th Passout Year" onChange={handleChange} className="w-full p-2 border rounded-md" required />
                <input type="number" name="percentage12th" placeholder="12th Percentage" onChange={handleChange} className="w-full p-2 border rounded-md" required />
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-2 border rounded-md" required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-between">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatBooking;
