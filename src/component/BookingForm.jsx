import React, { useState } from "react";

const BookingForm = ({ seat, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    collegePassout: "",
    percentage12th: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    // Simple regex for email format validation
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email validation
    if (!validateEmail(formData.email)) {
      setError("Invalid email. Please enter a valid email address.");
      return;
    }
    setError("");
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Book Seat {seat}</h2>

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
            name="collegePassout"
            placeholder="College Passout Year"
            value={formData.collegePassout}
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
      </div>
    </div>
  );
};

export default BookingForm;
