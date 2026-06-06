function BlogCard({ title, description, date }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg hover:scale-105 transition">
      <p className="text-cyan-400 text-sm">{date}</p>

      <h3 className="text-xl font-bold text-white mt-2">
        {title}
      </h3>

      <p className="text-slate-300 mt-3">
        {description}
      </p>

      <button className="mt-4 text-cyan-400 hover:underline">
        Read More →
      </button>
    </div>
  );
}

export default BlogCard;