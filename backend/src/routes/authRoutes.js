import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
}

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, studentId } = req.body;

        console.log("Registration attempt:", { name, email, studentId });

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" })
        }

        if (name.length < 3) {
            return res.status(400).json({ message: "Name should be at least 3 characters long" })
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email address already taken" })
        }

        if (studentId) {
            const existingStudentId = await User.findOne({ studentId });
            if (existingStudentId) {
                return res.status(400).json({ message: "Student ID already registered" })
            }
        }

        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

        const user = new User({
            name,
            email,
            password,
            studentId,
            profileImage,
        });

        console.log("Saving user to database...");
        await user.save();
        console.log("User saved successfully!");

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                studentId: user.studentId,
                role: user.role,
                course: user.course,
                year: user.year,
                bio: user.bio,
                profileImage: user.profileImage
            },
        })

    } catch (error) {
        console.log("Error in register route:", error);
        console.log("Error message:", error.message);
        console.log("Error name:", error.name);
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or student ID already exists"
            });
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login attempt:", { email });

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                studentId: user.studentId,
                role: user.role,
                course: user.course,
                year: user.year,
                bio: user.bio,
                profileImage: user.profileImage
            },
        });

    } catch (error) {
        console.log("Error in login route:", error);
        console.log("Error message:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

});

// Update Profile - Update user profile information
router.put("/update-profile", async (req, res) => {
    try {
        const { userId, name, course, year, bio } = req.body;

        console.log("Update profile attempt:", { userId, name });

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if provided
        if (name !== undefined) user.name = name;
        if (course !== undefined) user.course = course;
        if (year !== undefined) user.year = year;
        if (bio !== undefined) user.bio = bio;

        await user.save();

        console.log("Profile updated successfully for:", userId);

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                studentId: user.studentId,
                role: user.role,
                course: user.course,
                year: user.year,
                bio: user.bio,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.log("Error in update profile route:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// Change Password - For authenticated users
router.put("/change-password", async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        console.log("Change password attempt:", { userId });

        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password should be at least 6 characters long" });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        console.log("Password changed successfully for:", userId);

        res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        console.log("Error in change password route:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// Forgot Password - Generate reset token
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        console.log("Forgot password attempt:", { email });

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // For security, don't reveal if email exists or not
            return res.status(200).json({
                message: "If an account with that email exists, a password reset link has been sent."
            });
        }

        // Generate reset token (6-digit code for simplicity)
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash the token before saving
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set token and expiration (15 minutes)
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        console.log("Password reset token generated:", resetToken);

        // In a real app, you would send this via email
        // For now, we'll return it in the response for testing
        res.status(200).json({
            message: "Password reset code generated successfully",
            resetToken: resetToken, // In production, send via email instead
            email: user.email
        });

    } catch (error) {
        console.log("Error in forgot password route:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

// Reset Password - Verify token and update password
router.post("/reset-password", async (req, res) => {
    try {
        const { email, resetToken, newPassword } = req.body;

        console.log("Reset password attempt:", { email });

        if (!email || !resetToken || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" });
        }

        // Hash the provided token to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const user = await User.findOne({
            email,
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset code" });
        }

        // Update password
        user.password = newPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        console.log("Password reset successful for:", email);

        res.status(200).json({
            message: "Password reset successful"
        });

    } catch (error) {
        console.log("Error in reset password route:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});


export default router;