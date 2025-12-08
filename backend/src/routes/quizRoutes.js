import express from 'express';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Get all quizzes for a user
router.get('/quizzes/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const quizzes = await Quiz.find({ userId }).sort({ createdAt: -1 });
        res.json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
    }
});

// Get a single quiz by ID
router.get('/quizzes/single/:quizId', async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.json(quiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ message: 'Error fetching quiz', error: error.message });
    }
});

// Create a new quiz
router.post('/quizzes', async (req, res) => {
    try {
        const { userId, title, questions } = req.body;

        if (!userId || !title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validate questions
        for (const q of questions) {
            if (!q.question || !q.options || q.options.length !== 4 || q.correct === undefined) {
                return res.status(400).json({ message: 'Invalid question format' });
            }
        }

        const quiz = new Quiz({
            userId,
            title,
            questions,
            completed: false,
        });

        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: 'Error creating quiz', error: error.message });
    }
});

// Update a quiz
router.put('/quizzes/:quizId', async (req, res) => {
    try {
        const { quizId } = req.params;
        const { userId, title, questions, completed } = req.body;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Verify ownership
        if (quiz.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Update fields
        if (title !== undefined) quiz.title = title;
        if (questions !== undefined) {
            // Validate questions
            for (const q of questions) {
                if (!q.question || !q.options || q.options.length !== 4 || q.correct === undefined) {
                    return res.status(400).json({ message: 'Invalid question format' });
                }
            }
            quiz.questions = questions;
        }
        if (completed !== undefined) quiz.completed = completed;

        await quiz.save();
        res.json(quiz);
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ message: 'Error updating quiz', error: error.message });
    }
});

// Delete a quiz
router.delete('/quizzes/:quizId', async (req, res) => {
    try {
        const { quizId } = req.params;
        const { userId } = req.body;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Verify ownership
        if (quiz.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Quiz.findByIdAndDelete(quizId);
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ message: 'Error deleting quiz', error: error.message });
    }
});

export default router;
