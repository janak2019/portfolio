
import express from "express";
import mongoose from "mongoose";
import Message from "../model/Message.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public - send message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
      is_read: false,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      messageId: newMessage._id,
    });
  } catch (error) {
    console.error("Error saving message:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

// Admin - get messages
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ created_at: -1 });

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
});

// Admin - mark message as read
router.put("/:id/read", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const message = await Message.findByIdAndUpdate(
      id,
      { is_read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message marked as read",
      data: message,
    });
  } catch (error) {
    console.error("Error updating message:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update message",
    });
  }
});

// Admin - delete message
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
});

export default router;
