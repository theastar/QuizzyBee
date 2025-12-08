import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const migrateUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find all users without createdAt or updatedAt
        const usersWithoutTimestamps = await User.find({
            $or: [
                { createdAt: { $exists: false } },
                { updatedAt: { $exists: false } }
            ]
        });

        console.log(`Found ${usersWithoutTimestamps.length} users without timestamps`);

        if (usersWithoutTimestamps.length === 0) {
            console.log('All users already have timestamps!');
            process.exit(0);
        }

        // Update each user to add timestamps
        const now = new Date();
        for (const user of usersWithoutTimestamps) {
            if (!user.createdAt) {
                user.createdAt = now;
            }
            if (!user.updatedAt) {
                user.updatedAt = now;
            }
            if (!user.lastActive) {
                user.lastActive = now;
            }
            await user.save();
            console.log(`Updated user: ${user.email}`);
        }

        console.log('✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

migrateUsers();
