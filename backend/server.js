import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// ================= HOME ROUTE =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Janak Portfolio API is running 🚀",
  });
});

// ================= API ROUTES =================

app.use("/api/projects", projectRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ================= START SERVER =================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

