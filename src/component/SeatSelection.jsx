import axios from "axios";
import React, { useState, useEffect } from "react";

const SeatSelection = ({ onSelectSeat }) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const totalSeats = 30; // Adjust as per your requirement

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        setBookedSeats(response.data.map((seat) => seat.seat));
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };

    fetchBookedSeats();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {Array.from({ length: totalSeats }, (_, index) => {
        const seatNumber = index + 1;
        const isBooked = bookedSeats.includes(seatNumber);

        return (
          <button
            key={seatNumber}
            onClick={() => !isBooked && onSelectSeat(seatNumber)}
            disabled={isBooked}
            className={`w-16 h-16 rounded-md text-white font-bold ${
              isBooked ? "bg-red-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {seatNumber}
          </button>
        );
      })}
    </div>
  );
};

export default SeatSelection;
