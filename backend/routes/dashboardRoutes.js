import express from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const [[projects]] = await db.query(
      "SELECT COUNT(*) AS total FROM projects"
    );

    const [[blogs]] = await db.query(
      "SELECT COUNT(*) AS total FROM blogs"
    );

    const [[publishedBlogs]] = await db.query(
      "SELECT COUNT(*) AS total FROM blogs WHERE published = TRUE"
    );

    const [[messages]] = await db.query(
      "SELECT COUNT(*) AS total FROM messages"
    );

    const [[unreadMessages]] = await db.query(
      "SELECT COUNT(*) AS total FROM messages WHERE is_read = FALSE"
    );

    res.json({
      success: true,
      data: {
        projects: projects.total,
        blogs: blogs.total,
        publishedBlogs: publishedBlogs.total,
        messages: messages.total,
        unreadMessages: unreadMessages.total,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
    });
  }
});

export default router;