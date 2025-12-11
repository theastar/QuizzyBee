import express from "express";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import Deck from "../models/Deck.js";
import Note from "../models/Note.js";
import { authenticate, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication and admin check to all routes
router.use(authenticate);
router.use(isAdmin);

// GET /admin/stats - Get dashboard statistics
router.get("/stats", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user', status: 'active' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const deactivatedUsers = await User.countDocuments({ status: 'deactivated' });

        // Count actual quizzes, flashcards, and notes from database
        const totalQuizzes = await Quiz.countDocuments();
        const totalNotes = await Note.countDocuments();

        // Count total flashcards across all decks
        const decks = await Deck.find();
        const totalFlashcards = decks.reduce((sum, deck) => sum + deck.cards.length, 0);

        const stats = {
            totalUsers,
            totalAdmins,
            deactivatedUsers,
            totalQuizzes,
            totalFlashcards,
            totalNotes
        };

        res.status(200).json(stats);
    } catch (error) {
        console.log("Error fetching stats:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// GET /admin/users - Get all users with optional filters (excludes admins by default)
router.get("/users", async (req, res) => {
    try {
        const { search, status, role } = req.query;

        let query = {};

        // By default, only show regular users (not admins)
        // Unless explicitly requesting admins via role=admin
        if (role) {
            query.role = role;
        } else {
            query.role = 'user'; // Default: only show regular users
        }

        // Search by name, email, or studentId
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { studentId: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        const users = await User.find(query)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .sort({ createdAt: -1 });

        res.status(200).json({
            users,
            count: users.length
        });
    } catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// GET /admin/users/:id - Get user details
router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .select('-password -resetPasswordToken -resetPasswordExpires');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get user's content statistics
        const quizzesCount = await Quiz.countDocuments({ userId: id });
        const notesCount = await Note.countDocuments({ userId: id });

        // Count user's flashcards across all their decks
        const userDecks = await Deck.find({ userId: id });
        const flashcardsCount = userDecks.reduce((sum, deck) => sum + deck.cards.length, 0);

        // Add stats to user object
        const userWithStats = {
            ...user.toObject(),
            stats: {
                quizzes: quizzesCount,
                flashcards: flashcardsCount,
                notes: notesCount
            }
        };

        res.status(200).json({ user: userWithStats });
    } catch (error) {
        console.log("Error fetching user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// PUT /admin/users/:id - Update user (admin)
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, studentId, course, year, bio, role } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already taken" });
            }
            user.email = email;
        }

        // Check if studentId is being changed and if it's already taken
        if (studentId && studentId !== user.studentId) {
            const existingStudentId = await User.findOne({ studentId });
            if (existingStudentId) {
                return res.status(400).json({ message: "Student ID already taken" });
            }
            user.studentId = studentId;
        }

        // Update other fields
        if (name !== undefined) user.name = name;
        if (course !== undefined) user.course = course;
        if (year !== undefined) user.year = year;
        if (bio !== undefined) user.bio = bio;
        if (role !== undefined) user.role = role;

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                studentId: user.studentId,
                role: user.role,
                course: user.course,
                year: user.year,
                bio: user.bio,
                status: user.status,
                profileImage: user.profileImage,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// PUT /admin/users/:id/deactivate - Deactivate user
router.put("/users/:id/deactivate", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: "Cannot deactivate admin users" });
        }

        user.status = 'deactivated';
        await user.save();

        res.status(200).json({
            message: "User deactivated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                status: user.status
            }
        });
    } catch (error) {
        console.log("Error deactivating user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// PUT /admin/users/:id/activate - Activate user
router.put("/users/:id/activate", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = 'active';
        await user.save();

        res.status(200).json({
            message: "User activated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                status: user.status
            }
        });
    } catch (error) {
        console.log("Error activating user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// DELETE /admin/users/:id - Delete user
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: "Cannot delete admin users" });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log("Error deleting user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// GET /admin/users/recent/activity - Get recent user activity
router.get("/users/recent/activity", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const recentUsers = await User.find({ role: 'user', status: 'active' })
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .sort({ lastActive: -1 })
            .limit(limit);

        res.status(200).json({
            users: recentUsers,
            count: recentUsers.length
        });
    } catch (error) {
        console.log("Error fetching recent activity:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

export default router;
