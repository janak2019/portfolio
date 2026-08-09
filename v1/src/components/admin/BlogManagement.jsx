
import { useEffect, useState } from "react";
import api from "../../api/api";

import AddBlogForm from "./AddBlogForm";
import EditBlogForm from "./EditBlogForm";

function BlogManagement({ onChange }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/blogs/admin/all");

      setBlogs(response.data.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= DELETE BLOG =================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/blogs/${id}`);

      // Update blog list
      fetchBlogs();

      // Update dashboard statistics
      onChange?.();

    } catch (error) {
      console.error("Failed to delete blog:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete blog."
      );
    }
  };

  // ================= PUBLISH / DRAFT =================

  const togglePublished = async (blog) => {
    try {
      await api.put(`/blogs/${blog.id}`, {
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image,
        slug: blog.slug,
        published: !blog.published,
      });

      // Update blog list
      fetchBlogs();

      // Update dashboard statistics
      onChange?.();

    } catch (error) {
      console.error(
        "Failed to update blog status:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update blog status."
      );
    }
  };

  if (loading) {
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p className="text-slate-400">
          Loading blogs...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl">

      {/* ================= HEADER ================= */}

      <div className="p-6 border-b border-slate-800 flex justify-between items-center">

        <div>
          <h3 className="text-xl font-bold">
            Blog Management
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Manage your articles
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition"
        >
          Add Blog
        </button>

      </div>

      {/* ================= ADD BLOG FORM ================= */}

      {showAddForm && (
        <div className="p-6 pb-0">

          <AddBlogForm
            onClose={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false);

              fetchBlogs();

              // Update dashboard statistics
              onChange?.();
            }}
          />

        </div>
      )}

      {/* ================= EDIT BLOG FORM ================= */}

      {editingBlog && (
        <div className="p-6 pb-0">

          <EditBlogForm
            blog={editingBlog}
            onClose={() => setEditingBlog(null)}
            onSuccess={() => {
              setEditingBlog(null);

              fetchBlogs();

              // Update dashboard statistics
              onChange?.();
            }}
          />

        </div>
      )}

      {/* ================= BLOG TABLE ================= */}

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="text-slate-400 text-sm border-b border-slate-800">

            <tr>

              <th className="px-6 py-4">
                #
              </th>

              <th className="px-6 py-4">
                Title
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Date
              </th>

              <th className="px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {blogs.map((blog) => (

              <tr
                key={blog.id}
                className="border-b border-slate-800 last:border-none"
              >

                {/* ID */}

                <td className="px-6 py-4 text-slate-400">
                  {blog.id}
                </td>

                {/* TITLE */}

                <td className="px-6 py-4">

                  <p className="font-semibold">
                    {blog.title}
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    {blog.description}
                  </p>

                </td>

                {/* STATUS */}

                <td className="px-6 py-4">

                  <button
                    onClick={() =>
                      togglePublished(blog)
                    }
                    className={
                      blog.published
                        ? "text-green-400 hover:underline"
                        : "text-yellow-400 hover:underline"
                    }
                  >
                    {blog.published
                      ? "Published"
                      : "Draft"}
                  </button>

                </td>

                {/* DATE */}

                <td className="px-6 py-4 text-slate-400">

                  {new Date(
                    blog.created_at
                  ).toLocaleDateString()}

                </td>

                {/* ACTIONS */}

                <td className="px-6 py-4">

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        setEditingBlog(blog)
                      }
                      className="text-cyan-400 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(blog.id)
                      }
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* EMPTY STATE */}

        {blogs.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No blogs found.
          </div>
        )}

      </div>

    </section>
  );
}

export default BlogManagement;

