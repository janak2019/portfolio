import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

function Blog() {
  const blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      description:
        "Learn the fundamentals of React and component-based development.",
      date: "June 2026",
    },
    {
      id: 2,
      title: "Why Tailwind CSS?",
      description:
        "Discover how Tailwind CSS speeds up modern web development.",
      date: "May 2026",
    },
    {
      id: 3,
      title: "Building a Portfolio Website",
      description:
        "A complete guide to creating a professional developer portfolio.",
      date: "April 2026",
    },
  ];

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Blog;