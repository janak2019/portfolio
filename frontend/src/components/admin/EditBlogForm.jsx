import { useState } from "react";
import api from "../../api/api";

function EditBlogForm({ blog, onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    title: blog.title || "",
    description: blog.description || "",
    content: blog.content || "",
    image: blog.image || "",
    slug: blog.slug || "",
    published: Boolean(blog.published),
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

 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    await api.put(`/blogs/${blog._id}`, formData);

    onSuccess();
  } catch (error) {
    console.error(error);

    setError(
      error.response?.data?.message ||
        "Failed to update blog."
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
            Edit Blog
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Update your article
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
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short Description"
          rows="3"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog Content"
          rows="10"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="blog-slug"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <label className="flex items-center gap-3 text-slate-300">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-4 h-4"
          />

          Published
        </label>

        <div className="flex gap-3 mt-3">

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-400 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Blog"}
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

export default EditBlogForm;