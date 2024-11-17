import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://car-management-108y.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add token if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
