import { create } from 'zustand';
import adminAPI from '../services/adminApi';

export const useAdminStore = create((set, get) => ({
  users: [],
  stats: {
    totalUsers: 0,
    totalAdmins: 0,
    deactivatedUsers: 0,
    totalQuizzes: 0,
    totalFlashcards: 0,
    totalNotes: 0
  },
  recentActivity: [],
  loading: false,
  error: null,

  // Fetch dashboard statistics
  fetchStats: async () => {
    try {
      set({ loading: true, error: null });
      const stats = await adminAPI.getStats();
      set({ stats, loading: false });
      return stats;
    } catch (error) {
      console.error('Error fetching stats:', error);
      set({
        error: error.response?.data?.message || 'Failed to fetch statistics',
        loading: false
      });
      throw error;
    }
  },

  // Fetch all users
  fetchUsers: async (search = '', status = '', role = '') => {
    try {
      set({ loading: true, error: null });
      const data = await adminAPI.getUsers(search, status, role);
      set({ users: data.users, loading: false });
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      set({
        error: error.response?.data?.message || 'Failed to fetch users',
        loading: false
      });
      throw error;
    }
  },

  // Fetch user by ID
  fetchUserById: async (userId) => {
    try {
      set({ loading: true, error: null });
      const data = await adminAPI.getUserById(userId);
      set({ loading: false });
      return data.user;
    } catch (error) {
      console.error('Error fetching user:', error);
      set({
        error: error.response?.data?.message || 'Failed to fetch user details',
        loading: false
      });
      throw error;
    }
  },

  // Update user
  updateUser: async (userId, updates) => {
    try {
      set({ loading: true, error: null });
      const data = await adminAPI.updateUser(userId, updates);

      // Update user in local state
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? data.user : user
        ),
        loading: false
      }));

      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      set({
        error: error.response?.data?.message || 'Failed to update user',
        loading: false
      });
      throw error;
    }
  },

  // Deactivate user
  deactivateUser: async (userId) => {
    try {
      set({ loading: true, error: null });
      const data = await adminAPI.deactivateUser(userId);

      // Update user status in local state
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, status: 'deactivated' } : user
        ),
        loading: false
      }));

      return data;
    } catch (error) {
      console.error('Error deactivating user:', error);
      set({
        error: error.response?.data?.message || 'Failed to deactivate user',
        loading: false
      });
      throw error;
    }
  },

  // Activate user
  activateUser: async (userId) => {
    try {
      set({ loading: true, error: null });
      const data = await adminAPI.activateUser(userId);

      // Update user status in local state
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, status: 'active' } : user
        ),
        loading: false
      }));

      return data;
    } catch (error) {
      console.error('Error activating user:', error);
      set({
        error: error.response?.data?.message || 'Failed to activate user',
        loading: false
      });
      throw error;
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      set({ loading: true, error: null });
      await adminAPI.deleteUser(userId);

      // Remove user from local state
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
        loading: false
      }));

      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      set({
        error: error.response?.data?.message || 'Failed to delete user',
        loading: false
      });
      throw error;
    }
  },

  // Fetch recent activity
  fetchRecentActivity: async (limit = 10) => {
    try {
      set({ loading: true, error: null });
      const data = await adminAPI.getRecentActivity(limit);
      set({ recentActivity: data.users, loading: false });
      return data;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      set({
        error: error.response?.data?.message || 'Failed to fetch recent activity',
        loading: false
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
