import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/api";

function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/blogs/${slug}`);

      setBlog(response.data.data);
    } catch (error) {
      console.error(error);

      setError("Blog post not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 pt-28 pb-20 px-6">

        <div className="max-w-4xl mx-auto">

          {loading && (
            <p className="text-center text-slate-400">
              Loading article...
            </p>
          )}

          {error && (
            <div className="text-center">
              <p className="text-red-400 mb-6">
                {error}
              </p>

              <Link
                to="/blog"
                className="text-cyan-400 hover:underline"
              >
                ← Back to Blog
              </Link>
            </div>
          )}

          {!loading && !error && blog && (
            <article>

              <Link
                to="/blog"
                className="text-cyan-400 hover:underline"
              >
                ← Back to Blog
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-white mt-8">
                {blog.title}
              </h1>

              <p className="text-cyan-400 mt-4">
                {new Date(blog.created_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>

              <p className="text-xl text-slate-300 leading-8 mt-8">
                {blog.description}
              </p>

              <div className="mt-8 text-slate-300 leading-8 whitespace-pre-line">
                {blog.content}
              </div>

            </article>
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default BlogDetails;