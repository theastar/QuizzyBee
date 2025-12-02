import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
}

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log("Registration attempt:", { username, email });

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" })
        }

        if (username.length < 6) {
            return res.status(400).json({ message: "Username should be at least 6 characters long" })
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email address already taken" })
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" })
        }

        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

        const user = new User({
            username,
            email,
            password,
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
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            },
        })

    } catch (error) {
        console.log("Error in register route:", error);
        console.log("Error message:", error.message);
        console.log("Error name:", error.name);
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Username or email already exists"
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
                username: user.username,
                email: user.email,
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


export default router;