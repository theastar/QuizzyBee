import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Get all events for a user
router.get("/events/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        console.log("Fetching events for user:", userId);

        const events = await Event.find({ userId }).sort({ date: 1, createdAt: 1 });

        res.status(200).json({
            success: true,
            events: events.map(event => ({
                id: event._id.toString(),
                title: event.title,
                type: event.type,
                priority: event.priority,
                date: event.date
            }))
        });

    } catch (error) {
        console.log("Error fetching events:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Create a new event
router.post("/events", async (req, res) => {
    try {
        const { userId, title, type, priority, date } = req.body;

        console.log("Creating event:", { userId, title, type, priority, date });

        if (!userId || !title || !type || !priority || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate type
        if (!['Quiz/Test', 'Assignment', 'Study'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event type"
            });
        }

        // Validate priority
        if (!['Focus First', 'Do Soon', 'Can Wait'].includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Invalid priority"
            });
        }

        const event = new Event({
            userId,
            title: title.trim(),
            type,
            priority,
            date
        });

        await event.save();

        console.log("Event created successfully:", event._id);

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: {
                id: event._id.toString(),
                title: event.title,
                type: event.type,
                priority: event.priority,
                date: event.date
            }
        });

    } catch (error) {
        console.log("Error creating event:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

// Delete an event
router.delete("/events/:eventId", async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        console.log("Deleting event:", eventId, "for user:", userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const event = await Event.findOne({ _id: eventId, userId });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        await Event.deleteOne({ _id: eventId });

        console.log("Event deleted successfully:", eventId);

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.log("Error deleting event:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

export default router;
