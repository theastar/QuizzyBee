import { create } from 'zustand';
import { authAPI } from '../services/api';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Register user
    register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const data = await authAPI.register(username, email, password);
            global.authToken = data.token;
            set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
            return { success: true };
        } catch (error) {
            console.log("Registration error:", error);
            let errorMessage = 'Registration failed';

            if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
                errorMessage = 'Cannot connect to server. Please check your internet connection and make sure the backend is running.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
        }
    },

    // Login user
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const data = await authAPI.login(email, password);
            global.authToken = data.token;
            set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
            return { success: true };
        } catch (error) {
            console.log("Login error:", error);
            let errorMessage = 'Login failed';

            if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
                errorMessage = 'Cannot connect to server. Please check your internet connection and make sure the backend is running.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
        }
    },

    // Logout user
    logout: () => {
        global.authToken = null;
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
        });
    },

    // Clear error
    clearError: () => set({ error: null }),
}));
