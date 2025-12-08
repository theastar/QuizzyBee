import express from "express";
import "dotenv/config.js";
import { connectDB } from "./lib/db.js";
import { initializeAdmin } from "./lib/initAdmin.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
    console.log(`Access from network: http://192.168.1.18:${PORT}`);
    connectDB();
    initializeAdmin(); // Initialize admin account
})