import mongoose from "mongoose";
import "dotenv/config.js";

async function fixDatabase() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✓ Connected to MongoDB");

        const db = mongoose.connection.db;
        const collection = db.collection('users');

        // Get all indexes
        const indexes = await collection.indexes();
        console.log("\nCurrent indexes:");
        indexes.forEach(index => {
            console.log(" -", JSON.stringify(index.key));
        });

        // Drop the username index if it exists
        try {
            await collection.dropIndex('username_1');
            console.log("\n✓ Dropped username index");
        } catch (e) {
            console.log("\n- Username index doesn't exist or already dropped");
        }

        // Drop the studentId index if it exists (we'll recreate it as sparse)
        try {
            await collection.dropIndex('studentId_1');
            console.log("✓ Dropped studentId index");
        } catch (e) {
            console.log("- StudentId index doesn't exist or already dropped");
        }

        // Create sparse index for studentId
        await collection.createIndex({ studentId: 1 }, { unique: true, sparse: true });
        console.log("✓ Created sparse index for studentId");

        console.log("\n✓ Database indexes fixed!");
        console.log("Now run: node createAdmin.js");

        process.exit(0);
    } catch (error) {
        console.log("✗ Error:", error.message);
        process.exit(1);
    }
}

fixDatabase();
