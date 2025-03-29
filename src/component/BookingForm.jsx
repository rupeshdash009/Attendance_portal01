import axios from "axios";
import React, { useState } from "react";

const BookingForm = ({ seat, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    twelfthPassoutYear: "",
    percentage12th: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [eligibilityError, setEligibilityError] = useState(""); // To show eligibility message
  const [passoutYearError, setPassoutYearError] = useState(""); // For passout year validation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const currentYear = new Date().getFullYear();
  
    if (formData.twelfthPassoutYear > currentYear) {
      setPassoutYearError("The passout year cannot be in the future.");
      return;
    }
    setPassoutYearError("");
  
    if (formData.percentage12th < 45) {
      setEligibilityError("Sorry, you are not eligible for seat booking due to low percentage.");
      return;
    }
    setEligibilityError("");
  
    if (!validateEmail(formData.email)) {
      setError("Invalid email. Please enter a valid email address.");
      return;
    }
    setError("");
  
    setLoading(true);
  
    try {
      const response = await axios.post("https://attendance-backend12-production.up.railway.app/api/bookings/book-seat", {
        ...formData,
        seat,
      });

      console.log("booking sets" , response.data);
  
      alert("Seat booked successfully!");
      onClose(); // Close the modal after success
    } catch (error) {
      console.error("Error booking seat:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Book Seat {seat}</h2>

        {/* Eligibility and Passout Year Error Messages */}
        {eligibilityError && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-md">
            {eligibilityError}
          </div>
        )}
        {passoutYearError && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-md">
            {passoutYearError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="twelfthPassoutYear"
            placeholder="12th Passout Year"
            value={formData.twelfthPassoutYear}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="number"
            name="percentage12th"
            placeholder="12th Percentage"
            value={formData.percentage12th}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Confirm
            </button>
          </div>
        </form>

        {/* College Info for Low Percentage */}
        {formData.percentage12th && formData.percentage12th < 45 && (
          <div className="mt-4 text-gray-700">
            <h3 className="font-semibold">Important Information:</h3>
            <p className="text-sm">
              We suggest contacting the college's admissions office for more information on your eligibility.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
