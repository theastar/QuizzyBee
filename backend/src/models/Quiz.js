import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
        validate: [arr => arr.length === 4, 'Must have exactly 4 options'],
    },
    correct: {
        type: Number,
        required: true,
        min: 0,
        max: 3,
    },
});

const quizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: [arr => arr.length > 0, 'Quiz must have at least one question'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
    },
    correct: {
        type: Number,
        min: 0,
    },
    wrong: {
        type: Number,
        min: 0,
    },
}, {
    timestamps: true,
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
