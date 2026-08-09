import express from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const [projects] = await db.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
});

// POST create a new project
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      image,
      github_url,
      live_url,
    } = req.body;

    // Basic validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO projects
      (title, description, technologies, image, github_url, live_url)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        technologies || null,
        image || null,
        github_url || null,
        live_url || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      projectId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating project:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
});
// PUT update a project
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      technologies,
      image,
      github_url,
      live_url,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const [result] = await db.query(
      `UPDATE projects
       SET title = ?,
           description = ?,
           technologies = ?,
           image = ?,
           github_url = ?,
           live_url = ?
       WHERE id = ?`,
      [
        title,
        description,
        technologies || null,
        image || null,
        github_url || null,
        live_url || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
});

// DELETE a project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM projects WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
});
export default router;