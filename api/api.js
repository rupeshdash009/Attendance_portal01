import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const loginUser = async (phone, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, { phone, password });
    return data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};
