import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    }
});

const deckSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    cards: [flashcardSchema]
}, { timestamps: true });

// Index for efficient queries
deckSchema.index({ userId: 1, createdAt: -1 });

const Deck = mongoose.model("Deck", deckSchema);

export default Deck;
