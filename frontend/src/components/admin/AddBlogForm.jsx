import { useState } from "react";
import api from "../../api/api";

function AddBlogForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    slug: "",
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    setFormData({
      ...formData,
      slug,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.post("/blogs", formData);

      onSuccess();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">
            Add Blog
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Create a new article
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >

        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short Description"
          rows="3"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        {/* Content */}
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog Content"
          rows="10"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        {/* Image */}
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        {/* Slug */}
        <div className="flex gap-3">
          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="blog-slug"
            required
            className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
          />

          <button
            type="button"
            onClick={generateSlug}
            className="bg-slate-800 px-4 rounded-lg hover:bg-slate-700"
          >
            Generate
          </button>
        </div>

        {/* Published */}
        <label className="flex items-center gap-3 text-slate-300">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-4 h-4"
          />

          Publish immediately
        </label>

        {/* Buttons */}
        <div className="flex gap-3 mt-3">

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-400 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 px-6 py-3 rounded-lg hover:bg-slate-700"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddBlogForm;