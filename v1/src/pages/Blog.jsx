import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import api from "../api/api";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/blogs");

      setBlogs(response.data.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);

      setError("Unable to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 pt-28 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold text-center text-cyan-400 mb-4">
            My Blog
          </h1>

          <p className="text-center text-slate-300 mb-12">
            Thoughts, tutorials, and web development articles.
          </p>

          {/* Loading */}
          {loading && (
            <div className="text-center text-slate-400">
              Loading blogs...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center text-red-400">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center text-slate-400">
              No blog posts available.
            </div>
          )}

          {/* Blogs */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  {...blog}
                />
              ))}
            </div>
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Blog;