import React, { useState, useEffect } from "react";

const SeatBooking = () => {
  const [course, setCourse] = useState("BBA");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    passoutYear: "",
    percentage: "",
  });
  const [bookingError, setBookingError] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/booked-seats?course=${course}`);
        const data = await res.json();
        if (Array.isArray(data.bookedSeats)) {
          setBookedSeats(data.bookedSeats);
        }
      } catch (err) {
        console.error("Fetching booked seats failed:", err);
      }
    };

    fetchBookedSeats();
  }, [course]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openForm = (seat) => {
    if (!bookedSeats.includes(seat)) setSelectedSeat(seat); // Allow booking only if seat is not booked
  };

  const closeForm = () => {
    setSelectedSeat(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      passoutYear: "",
      percentage: "",
    });
    setBookingError(null);
  };

  const submitForm = async () => {
    const { name, phone, email, passoutYear, percentage } = form;

    if (!name || !phone || !email || !passoutYear || !percentage) {
      return setBookingError("Please fill all fields.");
    }

    // Check if the user has already booked a seat
    const isUserAlreadyBooked = bookedSeats.some(
      (booking) => booking.phone === phone
    );

    if (isUserAlreadyBooked) {
      return setBookingError("You have already booked a seat.");
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/book-seat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seatNumber: selectedSeat, course, ...form }),
      });

      const data = await res.json();

      if (res.ok) {
        setBookedSeats((prevSeats) => [
          ...prevSeats,
          { seat: selectedSeat, phone } // Store booked seat with phone number
        ]);
        alert(`Seat ${selectedSeat} booked successfully!`);
        closeForm();
      } else {
        setBookingError(data.message || "Booking failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setBookingError("Error booking seat.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 border">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Seat Booking</h1>
          <p className="text-gray-600">Select your seat for {course}</p>
        </div>

        <div className="mb-6 flex justify-center">
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-xl text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
          </select>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3 justify-center">
          {Array.from({ length: course === "BBA" ? 60 : 30 }, (_, i) => i + 1).map((seat) => (
            <button
              key={seat}
              onClick={() => openForm(seat)}
              className={`w-14 h-14 rounded-lg font-bold text-white flex items-center justify-center transition ${
                bookedSeats.some((booking) => booking.seat === seat)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={bookedSeats.some((booking) => booking.seat === seat)} // Disable the booked seat
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      {selectedSeat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Booking Seat #{selectedSeat}</h2>
              <button onClick={closeForm} className="text-gray-500">✕</button>
            </div>
            <div className="space-y-3">
              {["name", "phone", "email", "passoutYear", "percentage"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              ))}
              {bookingError && <p className="text-red-600 text-sm">{bookingError}</p>}
              <button
                onClick={submitForm}
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                {isLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatBooking;
