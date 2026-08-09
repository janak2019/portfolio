import { useState } from "react";
import api from "../../api/api";

function EditProjectForm({ project, onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    title: project.title || "",
    description: project.description || "",
    technologies: project.technologies || "",
    image: project.image || "",
    github_url: project.github_url || "",
    live_url: project.live_url || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.put(`/projects/${project._id}`, formData);

      onSuccess();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">
          Edit Project
        </h3>

        <button
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
          placeholder="Project Title"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          rows="4"
          required
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <input
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React, Node.js, MySQL"
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
          name="github_url"
          value={formData.github_url}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <input
          name="live_url"
          value={formData.live_url}
          onChange={handleChange}
          placeholder="Live URL"
          className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
        />

        <div className="flex gap-3 mt-3">

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-400 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Project"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 px-6 py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
}

export default EditProjectForm;