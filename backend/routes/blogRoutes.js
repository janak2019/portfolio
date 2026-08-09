import express from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/admin/all", authMiddleware, async (req, res) => {
  try {
    const [blogs] = await db.query(
      `SELECT *
       FROM blogs
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching admin blogs:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
});

// GET published blogs
router.get("/", async (req, res) => {
  try {
    const [blogs] = await db.query(
      `SELECT id, title, description, content, image, slug, published, created_at, updated_at
       FROM blogs
       WHERE published = TRUE
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
});

// GET single blog
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const [blogs] = await db.query(
      `SELECT *
       FROM blogs
       WHERE slug = ? AND published = TRUE
       LIMIT 1`,
      [slug]
    );

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blogs[0],
    });
  } catch (error) {
    console.error("Error fetching blog:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
});

// CREATE blog
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      image,
      slug,
      published,
    } = req.body;

    if (!title || !description || !content || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title, description, content and slug are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO blogs
       (title, description, content, image, slug, published)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        content,
        image || null,
        slug,
        published ?? true,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blogId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating blog:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
});

// UPDATE blog
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      content,
      image,
      slug,
      published,
    } = req.body;

    if (!title || !description || !content || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title, description, content and slug are required",
      });
    }

    const [result] = await db.query(
      `UPDATE blogs
       SET title = ?,
           description = ?,
           content = ?,
           image = ?,
           slug = ?,
           published = ?
       WHERE id = ?`,
      [
        title,
        description,
        content,
        image || null,
        slug,
        published ?? true,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
});

// DELETE blog
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM blogs WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
});

export default router;