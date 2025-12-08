import api from './api';

export const adminAPI = {
    // Get dashboard statistics
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    // Get all users with optional filters
    getUsers: async (search = '', status = '', role = '') => {
        const params = {};
        if (search) params.search = search;
        if (status) params.status = status;
        if (role) params.role = role;

        const response = await api.get('/admin/users', { params });
        return response.data;
    },

    // Get user details by ID
    getUserById: async (userId) => {
        const response = await api.get(`/admin/users/${userId}`);
        return response.data;
    },

    // Update user (admin)
    updateUser: async (userId, updates) => {
        const response = await api.put(`/admin/users/${userId}`, updates);
        return response.data;
    },

    // Deactivate user
    deactivateUser: async (userId) => {
        const response = await api.put(`/admin/users/${userId}/deactivate`);
        return response.data;
    },

    // Activate user
    activateUser: async (userId) => {
        const response = await api.put(`/admin/users/${userId}/activate`);
        return response.data;
    },

    // Delete user
    deleteUser: async (userId) => {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    },

    // Get recent user activity
    getRecentActivity: async (limit = 10) => {
        const response = await api.get('/admin/users/recent/activity', {
            params: { limit }
        });
        return response.data;
    },
};

export default adminAPI;
