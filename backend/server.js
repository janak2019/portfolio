import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Janak Portfolio API is running 🚀",
  });
});

// Database test
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");

    res.json({
      success: true,
      message: "MySQL connected successfully",
      data: rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Project routes
app.use("/api/projects", projectRoutes);

//Auth routes
app.use("/api/auth", authRoutes);

//Blog routes
app.use("/api/blogs", blogRoutes);

//Message routes
app.use("/api/messages", messageRoutes);

//Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});