import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Get all notes for a user
router.get("/notes/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        console.log("Fetching notes for user:", userId);

        const notes = await Note.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notes: notes.map(note => ({
                id: note._id.toString(),
                title: note.title,
                content: note.content,
                subject: note.subject,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }))
        });

    } catch (error) {
        console.log("Error fetching notes:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Create a new note
router.post("/notes", async (req, res) => {
    try {
        const { userId, title, content, subject } = req.body;

        console.log("Creating note:", { userId, title, subject });

        if (!userId || !title || !content || !subject) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const note = new Note({
            userId,
            title: title.trim(),
            content: content.trim(),
            subject: subject.trim()
        });

        await note.save();

        console.log("Note created successfully:", note._id);

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note: {
                id: note._id.toString(),
                title: note.title,
                content: note.content,
                subject: note.subject,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }
        });

    } catch (error) {
        console.log("Error creating note:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Update a note
router.put("/notes/:noteId", async (req, res) => {
    try {
        const { noteId } = req.params;
        const { userId, title, content, subject } = req.body;

        console.log("Updating note:", noteId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (title !== undefined) note.title = title.trim();
        if (content !== undefined) note.content = content.trim();
        if (subject !== undefined) note.subject = subject.trim();

        await note.save();

        console.log("Note updated successfully:", noteId);

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: {
                id: note._id.toString(),
                title: note.title,
                content: note.content,
                subject: note.subject,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }
        });

    } catch (error) {
        console.log("Error updating note:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Delete a note
router.delete("/notes/:noteId", async (req, res) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.body;

        console.log("Deleting note:", noteId, "for user:", userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        await Note.deleteOne({ _id: noteId });

        console.log("Note deleted successfully:", noteId);

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });

    } catch (error) {
        console.log("Error deleting note:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

export default router;
