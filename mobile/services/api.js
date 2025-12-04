import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for physical devices
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = global.authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (name, studentId, email, password) => {
    const response = await api.post('/auth/register', {
      name,
      studentId,
      email,
      password,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', {
      email,
    });
    return response.data;
  },

  resetPassword: async (email, resetToken, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      email,
      resetToken,
      newPassword,
    });
    return response.data;
  },

  updateProfile: async (userId, name, course, year, bio) => {
    const response = await api.put('/auth/update-profile', {
      userId,
      name,
      course,
      year,
      bio,
    });
    return response.data;
  },

  changePassword: async (userId, currentPassword, newPassword) => {
    const response = await api.put('/auth/change-password', {
      userId,
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

export default api;
