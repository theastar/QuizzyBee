import { create } from 'zustand';
import { quizAPI } from '../services/api';

// Helper function to format relative time
const getRelativeTime = (date) => {
    const now = new Date();
    const quizDate = new Date(date);
    const diffInMs = now - quizDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    return quizDate.toLocaleDateString();
};

export const useQuizStore = create((set, get) => ({
    quizHistory: [],
    loading: false,
    error: null,

    // Fetch recent quizzes from backend
    fetchRecentQuizzes: async (userId, limit = 4) => {
        try {
            set({ loading: true, error: null });
            const quizzes = await quizAPI.getRecentQuizzes(userId, limit);

            // Format quizzes with relative time
            const formattedQuizzes = quizzes.map(quiz => ({
                id: quiz._id,
                title: quiz.title,
                score: quiz.score,
                correct: quiz.correct,
                wrong: quiz.wrong,
                total: quiz.correct + quiz.wrong,
                completedAt: quiz.completedAt,
                date: getRelativeTime(quiz.completedAt)
            }));

            set({ quizHistory: formattedQuizzes, loading: false });
            return formattedQuizzes;
        } catch (error) {
            console.error('Error fetching recent quizzes:', error);
            set({
                error: error.response?.data?.message || 'Failed to fetch recent quizzes',
                loading: false
            });
            return [];
        }
    },

    // Get recent quizzes with formatted dates (for compatibility)
    getRecentQuizzes: (limit = 4) => {
        const history = get().quizHistory;
        return history.slice(0, limit);
    },

    // Clear error
    clearError: () => set({ error: null }),
}));
