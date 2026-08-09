import express from "express";
import db from "../config/db.js";
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

    const [result] = await db.query(
      `INSERT INTO messages
       (name, email, message)
       VALUES (?, ?, ?)`,
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      messageId: result.insertId,
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
    const [messages] = await db.query(
      `SELECT *
       FROM messages
       ORDER BY created_at DESC`
    );

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

    const [result] = await db.query(
      `UPDATE messages
       SET is_read = TRUE
       WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message marked as read",
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

    const [result] = await db.query(
      "DELETE FROM messages WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
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