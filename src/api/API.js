import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token if available
API.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData?.token) {
      config.headers['Authorization'] = `Bearer ${userData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
