import { create } from 'zustand';

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

    // Add a completed quiz to history
    addQuizToHistory: (quizData) => {
        const newQuiz = {
            id: Date.now().toString(),
            title: quizData.title,
            score: quizData.score,
            correct: quizData.correct,
            wrong: quizData.wrong,
            total: quizData.total,
            completedAt: new Date().toISOString(),
        };

        set((state) => ({
            quizHistory: [newQuiz, ...state.quizHistory].slice(0, 10) // Keep only last 10 quizzes
        }));
    },

    // Get recent quizzes with formatted dates
    getRecentQuizzes: (limit = 3) => {
        const history = get().quizHistory;
        return history.slice(0, limit).map(quiz => ({
            ...quiz,
            date: getRelativeTime(quiz.completedAt)
        }));
    },

    // Clear all quiz history
    clearHistory: () => {
        set({ quizHistory: [] });
    },
}));
