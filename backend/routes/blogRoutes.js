import express from "express";
import Blog from "../model/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all blogs for admin
router.get("/admin/all", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

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
    const blogs = await Blog.find({ published: true }).sort({
      createdAt: -1,
    });

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

// GET single published blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug,
      published: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog,
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

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      image: image || null,
      slug,
      published: published ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blogId: blog._id,
    });
  } catch (error) {
    console.error("Error creating blog:", error);

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

    const existingBlog = await Blog.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
        content,
        image: image || null,
        slug,
        published: published ?? true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
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

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
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

