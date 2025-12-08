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

export const calendarAPI = {
  getEvents: async (userId) => {
    const response = await api.get(`/calendar/events/${userId}`);
    return response.data;
  },

  createEvent: async (userId, title, type, priority, date) => {
    const response = await api.post('/calendar/events', {
      userId,
      title,
      type,
      priority,
      date,
    });
    return response.data;
  },

  deleteEvent: async (eventId, userId) => {
    const response = await api.delete(`/calendar/events/${eventId}`, {
      data: { userId }
    });
    return response.data;
  },
};

export const flashcardAPI = {
  getDecks: async (userId) => {
    const response = await api.get(`/flashcards/decks/${userId}`);
    return response.data;
  },

  createDeck: async (userId, title) => {
    const response = await api.post('/flashcards/decks', {
      userId,
      title,
    });
    return response.data;
  },

  deleteDeck: async (deckId, userId) => {
    const response = await api.delete(`/flashcards/decks/${deckId}`, {
      data: { userId }
    });
    return response.data;
  },

  addCard: async (deckId, userId, question, answer) => {
    const response = await api.post(`/flashcards/decks/${deckId}/cards`, {
      userId,
      question,
      answer,
    });
    return response.data;
  },

  updateCard: async (deckId, cardId, userId, question, answer) => {
    const response = await api.put(`/flashcards/decks/${deckId}/cards/${cardId}`, {
      userId,
      question,
      answer,
    });
    return response.data;
  },

  deleteCard: async (deckId, cardId, userId) => {
    const response = await api.delete(`/flashcards/decks/${deckId}/cards/${cardId}`, {
      data: { userId }
    });
    return response.data;
  },
};

export const quizAPI = {
  getQuizzes: async (userId) => {
    const response = await api.get(`/quizzes/quizzes/${userId}`);
    return response.data;
  },

  getQuiz: async (quizId) => {
    const response = await api.get(`/quizzes/quizzes/single/${quizId}`);
    return response.data;
  },

  createQuiz: async (userId, title, questions) => {
    const response = await api.post('/quizzes/quizzes', {
      userId,
      title,
      questions,
    });
    return response.data;
  },

  updateQuiz: async (quizId, userId, title, questions, completed) => {
    const response = await api.put(`/quizzes/quizzes/${quizId}`, {
      userId,
      title,
      questions,
      completed,
    });
    return response.data;
  },

  deleteQuiz: async (quizId, userId) => {
    const response = await api.delete(`/quizzes/quizzes/${quizId}`, {
      data: { userId }
    });
    return response.data;
  },
};

export default api;
