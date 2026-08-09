import express from "express";

import Project from "../model/Project.js";
import Blog from "../model/Blog.js";
import Message from "../model/Message.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET dashboard statistics
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    // Total projects
    const projects = await Project.countDocuments();

    // Total blogs
    const blogs = await Blog.countDocuments();

    // Published blogs
    const publishedBlogs = await Blog.countDocuments({
      published: true,
    });

    // Total messages
    const messages = await Message.countDocuments();

    // Unread messages
    const unreadMessages = await Message.countDocuments({
      is_read: false,
    });

    res.json({
      success: true,
      data: {
        projects,
        blogs,
        publishedBlogs,
        messages,
        unreadMessages,
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

