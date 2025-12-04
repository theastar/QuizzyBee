import mongoose from "mongoose";
import "dotenv/config.js";
import User from "./src/models/User.js";

const ADMIN_CREDENTIALS = {
    name: "Admin",
    email: "admin@quizzybee.com",
    password: "admin123",
    role: "admin"
};

async function createAdmin() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✓ Connected to MongoDB");

        // Delete any existing admin account first
        const deleted = await User.deleteOne({ email: ADMIN_CREDENTIALS.email });
        if (deleted.deletedCount > 0) {
            console.log("✓ Removed old admin account");
        }

        // Create fresh admin account
        const admin = new User({
            name: ADMIN_CREDENTIALS.name,
            email: ADMIN_CREDENTIALS.email,
            password: ADMIN_CREDENTIALS.password,
            role: ADMIN_CREDENTIALS.role,
            profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=Admin`
        });

        await admin.save();
        console.log("✓ Admin account created successfully!");
        console.log("  Email:", ADMIN_CREDENTIALS.email);
        console.log("  Password:", ADMIN_CREDENTIALS.password);
        console.log("\nYou can now login with these credentials.");

        process.exit(0);
    } catch (error) {
        console.log("✗ Error creating admin:", error.message);
        console.log("Full error:", error);
        process.exit(1);
    }
}

createAdmin();
