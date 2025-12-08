import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
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
    type: {
        type: String,
        enum: ['Quiz/Test', 'Assignment', 'Study'],
        required: true
    },
    priority: {
        type: String,
        enum: ['Focus First', 'Do Soon', 'Can Wait'],
        required: true
    },
    date: {
        type: String, // Store as YYYY-MM-DD format
        required: true,
        index: true
    }
}, { timestamps: true });

// Compound index for efficient queries
eventSchema.index({ userId: 1, date: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
