import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT token and attach user to request
export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Authentication error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Verify user is an admin
export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Admin access required" });
        }

        next();
    } catch (error) {
        console.log("Admin verification error:", error);
        return res.status(403).json({ message: "Access denied" });
    }
};
