import User from "../models/User.js";

// Admin credentials
const ADMIN_CREDENTIALS = {
    name: "Admin",
    email: "admin@quizzybee.com",
    password: "admin123",
    role: "admin"
};

export const initializeAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_CREDENTIALS.email });

        if (existingAdmin) {
            console.log("✓ Admin account already exists");
            return;
        }

        // Create admin account
        const admin = new User({
            name: ADMIN_CREDENTIALS.name,
            email: ADMIN_CREDENTIALS.email,
            password: ADMIN_CREDENTIALS.password,
            role: ADMIN_CREDENTIALS.role,
            profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=Admin`
        });

        await admin.save();
        console.log("✓ Admin account created successfully");
        console.log("  Email:", ADMIN_CREDENTIALS.email);
        console.log("  Password:", ADMIN_CREDENTIALS.password);

    } catch (error) {
        console.log("Error initializing admin:", error.message);
    }
};
