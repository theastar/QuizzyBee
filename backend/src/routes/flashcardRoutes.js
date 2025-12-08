import express from "express";
import Deck from "../models/Deck.js";

const router = express.Router();

// Get all decks for a user
router.get("/decks/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        console.log("Fetching decks for user:", userId);

        const decks = await Deck.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            decks: decks.map(deck => ({
                id: deck._id.toString(),
                title: deck.title,
                cards: deck.cards.map(card => ({
                    id: card._id.toString(),
                    question: card.question,
                    answer: card.answer
                }))
            }))
        });

    } catch (error) {
        console.log("Error fetching decks:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Create a new deck
router.post("/decks", async (req, res) => {
    try {
        const { userId, title } = req.body;

        console.log("Creating deck:", { userId, title });

        if (!userId || !title) {
            return res.status(400).json({
                success: false,
                message: "User ID and title are required"
            });
        }

        const deck = new Deck({
            userId,
            title: title.trim(),
            cards: []
        });

        await deck.save();

        console.log("Deck created successfully:", deck._id);

        res.status(201).json({
            success: true,
            message: "Deck created successfully",
            deck: {
                id: deck._id.toString(),
                title: deck.title,
                cards: []
            }
        });

    } catch (error) {
        console.log("Error creating deck:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Delete a deck
router.delete("/decks/:deckId", async (req, res) => {
    try {
        const { deckId } = req.params;
        const { userId } = req.body;

        console.log("Deleting deck:", deckId, "for user:", userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const deck = await Deck.findOne({ _id: deckId, userId });

        if (!deck) {
            return res.status(404).json({
                success: false,
                message: "Deck not found"
            });
        }

        await Deck.deleteOne({ _id: deckId });

        console.log("Deck deleted successfully:", deckId);

        res.status(200).json({
            success: true,
            message: "Deck deleted successfully"
        });

    } catch (error) {
        console.log("Error deleting deck:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Add a card to a deck
router.post("/decks/:deckId/cards", async (req, res) => {
    try {
        const { deckId } = req.params;
        const { userId, question, answer } = req.body;

        console.log("Adding card to deck:", deckId);

        if (!userId || !question || !answer) {
            return res.status(400).json({
                success: false,
                message: "User ID, question, and answer are required"
            });
        }

        const deck = await Deck.findOne({ _id: deckId, userId });

        if (!deck) {
            return res.status(404).json({
                success: false,
                message: "Deck not found"
            });
        }

        deck.cards.push({
            question: question.trim(),
            answer: answer.trim()
        });

        await deck.save();

        const newCard = deck.cards[deck.cards.length - 1];

        console.log("Card added successfully to deck:", deckId);

        res.status(201).json({
            success: true,
            message: "Card added successfully",
            card: {
                id: newCard._id.toString(),
                question: newCard.question,
                answer: newCard.answer
            }
        });

    } catch (error) {
        console.log("Error adding card:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Update a card in a deck
router.put("/decks/:deckId/cards/:cardId", async (req, res) => {
    try {
        const { deckId, cardId } = req.params;
        const { userId, question, answer } = req.body;

        console.log("Updating card:", cardId, "in deck:", deckId);

        if (!userId || !question || !answer) {
            return res.status(400).json({
                success: false,
                message: "User ID, question, and answer are required"
            });
        }

        const deck = await Deck.findOne({ _id: deckId, userId });

        if (!deck) {
            return res.status(404).json({
                success: false,
                message: "Deck not found"
            });
        }

        const card = deck.cards.id(cardId);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            });
        }

        card.question = question.trim();
        card.answer = answer.trim();

        await deck.save();

        console.log("Card updated successfully:", cardId);

        res.status(200).json({
            success: true,
            message: "Card updated successfully",
            card: {
                id: card._id.toString(),
                question: card.question,
                answer: card.answer
            }
        });

    } catch (error) {
        console.log("Error updating card:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Delete a card from a deck
router.delete("/decks/:deckId/cards/:cardId", async (req, res) => {
    try {
        const { deckId, cardId } = req.params;
        const { userId } = req.body;

        console.log("Deleting card:", cardId, "from deck:", deckId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const deck = await Deck.findOne({ _id: deckId, userId });

        if (!deck) {
            return res.status(404).json({
                success: false,
                message: "Deck not found"
            });
        }

        deck.cards.pull(cardId);
        await deck.save();

        console.log("Card deleted successfully:", cardId);

        res.status(200).json({
            success: true,
            message: "Card deleted successfully"
        });

    } catch (error) {
        console.log("Error deleting card:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

export default router;
