import { Link } from "react-router-dom";

function BlogCard({
  title,
  description,
  created_at,
  slug,
}) {
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-400 transition">

      <span className="text-sm text-cyan-400">
        {formattedDate}
      </span>

      <h3 className="text-xl font-bold text-white mt-2">
        {title}
      </h3>

      <p className="text-slate-300 mt-3 leading-7">
        {description}
      </p>

      <Link
        to={`/blog/${slug}`}
        className="inline-block mt-5 text-cyan-400 hover:underline"
      >
        Read More →
      </Link>

    </article>
  );
}

export default BlogCard;