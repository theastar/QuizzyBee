import { create } from 'zustand';
import { authAPI } from '../services/api';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Register user
    register: async (name, studentId, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const data = await authAPI.register(name, studentId, email, password);
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

    // Update user profile
    updateProfile: async (userId, name, course, year, bio) => {
        set({ isLoading: true, error: null });
        try {
            const data = await authAPI.updateProfile(userId, name, course, year, bio);
            set({
                user: data.user,
                isLoading: false,
                error: null,
            });
            return { success: true };
        } catch (error) {
            console.log("Update profile error:", error);
            let errorMessage = 'Profile update failed';

            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
        }
    },

    // Change password
    changePassword: async (userId, currentPassword, newPassword) => {
        set({ isLoading: true, error: null });
        try {
            const data = await authAPI.changePassword(userId, currentPassword, newPassword);
            set({
                isLoading: false,
                error: null,
            });
            return { success: true };
        } catch (error) {
            console.log("Change password error:", error);
            let errorMessage = 'Password change failed';

            if (error.response?.data?.message) {
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
