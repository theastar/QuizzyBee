import React, { createContext, useState, useEffect } from 'react';
import { quizAPI } from '../services/api';
import { useAuthStore } from './AuthStore';

export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const { user } = useAuthStore();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch quizzes when user is available
    useEffect(() => {
        if (user?._id) {
            fetchQuizzes();
        }
    }, [user]);

    const fetchQuizzes = async () => {
        if (!user?._id) return;

        try {
            setLoading(true);
            const data = await quizAPI.getQuizzes(user._id);
            setQuizzes(data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        } finally {
            setLoading(false);
        }
    };

    const addQuiz = async (title, questions) => {
        if (!user?._id) return;

        try {
            const newQuiz = await quizAPI.createQuiz(user._id, title, questions);
            setQuizzes([newQuiz, ...quizzes]);
            return newQuiz;
        } catch (error) {
            console.error('Error creating quiz:', error);
            throw error;
        }
    };

    const updateQuiz = async (quizId, title, questions, completed, score, correct, wrong) => {
        if (!user?._id) return;

        try {
            const updatedQuiz = await quizAPI.updateQuiz(quizId, user._id, title, questions, completed, score, correct, wrong);
            setQuizzes(quizzes.map(q => q._id === quizId ? updatedQuiz : q));
            return updatedQuiz;
        } catch (error) {
            console.error('Error updating quiz:', error);
            throw error;
        }
    };

    const deleteQuiz = async (quizId) => {
        if (!user?._id) return;

        try {
            await quizAPI.deleteQuiz(quizId, user._id);
            setQuizzes(quizzes.filter(q => q._id !== quizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
            throw error;
        }
    };

    return (
        <QuizContext.Provider value={{
            quizzes,
            loading,
            addQuiz,
            updateQuiz,
            deleteQuiz,
            fetchQuizzes,
        }}>
            {children}
        </QuizContext.Provider>
    );
}
