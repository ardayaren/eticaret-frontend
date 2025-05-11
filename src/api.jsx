// api.jsx
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend API URL

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/kaydol`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Beklenmeyen bir hata oluştu");
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/giris`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Beklenmeyen bir hata oluştu");
  }
};
