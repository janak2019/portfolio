import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, Eye, ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs, fetchBlogBySlug, addCommentToBlog, clearCurrentBlog } from '../store/slices/blogsSlice';

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs, currentBlog, loading } = useSelector((state) => state.blogs);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Comment Form state
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs({ status: 'Published' }));
  }, [dispatch]);

  const categories = [
    'All',
    'Programming Languages',
    'Web Development',
    'Cloud Computing',
    'Cyber Security',
    'DevOps',
    'AI & Machine Learning'
  ];

  // Client-side filtration logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      activeCategory === 'All' || blog.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Mock fallbacks
  const mockBlogs = [
    {
      title: 'Automating AWS Cloud Security Auditing in EKS',
      slug: 'automating-aws-cloud-security-auditing-in-eks',
      excerpt: 'Learn how to construct secure infrastructure audit loops in Kubernetes utilizing static SAST analyzers, container audits, and IAM validation checks.',
      category: 'Cyber Security',
      content: 'Cloud auditing is critical. In this tutorial, we construct a fully automated container auditing cycle in AWS Elastic Kubernetes Service. We leverage Trivy scans to examine active image packages and set up IAM role mapping validations to verify network routes. \n\nBy building automated check stages into your pipelines, we can flag misconfigurations before they reach production.',
      views: 124,
      publishedAt: '2026-05-15T00:00:00.000Z',
      comments: [
        { name: 'Alex Johnson', comment: 'Extremely detailed explanation! EKS security is a common pitfall.', createdAt: '2026-05-16T12:00:00.000Z' }
      ]
    },
    {
      title: 'Caching APIs with Redis and Mongoose Pipelines',
      slug: 'caching-apis-with-redis-and-mongoose-pipelines',
      excerpt: 'A comprehensive engineering guide explaining caching patterns, query middleware hooks, and cache invalidation strategies in Node.js applications.',
      category: 'Web Development',
      content: 'High-traffic APIs frequently hit database query choke points. Redis acts as a fast, in-memory cache layer. In this guide, we write a custom Mongoose query wrapper that checks Redis before fetching records from MongoDB. \n\nWe also outline clean invalidation mechanisms to update keys whenever administrative updates occur.',
      views: 98,
      publishedAt: '2026-04-20T00:00:00.000Z',
      comments: []
    }
  ];

  const displayBlogs = blogs.length > 0 ? filteredBlogs : (
    activeCategory === 'All' ? mockBlogs : mockBlogs.filter(b => b.category === activeCategory)
  );

  const activeBlog = currentBlog || (
    blogs.length === 0 ? mockBlogs.find(b => b.slug === sessionStorage.getItem('selectedSlug')) : null
  );

  const handleSelectBlog = (slug) => {
    sessionStorage.setItem('selectedSlug', slug);
    const apiBlog = blogs.find(b => b.slug === slug);
    if (apiBlog) {
      dispatch(fetchBlogBySlug(slug));
    } else {
      // Custom handler for Mock blogs
      const mockBlog = mockBlogs.find(b => b.slug === slug);
      // Dispatch mock setter or set state
      sessionStorage.setItem('mockActive', JSON.stringify(mockBlog));
      dispatch(fetchBlogBySlug(slug)); // This triggers call, fallback logic handles rendering
    }
  };

  const handleBackToList = () => {
    sessionStorage.removeItem('selectedSlug');
    sessionStorage.removeItem('mockActive');
    dispatch(clearCurrentBlog());
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) return;

    if (currentBlog?._id) {
      dispatch(addCommentToBlog({
        blogId: currentBlog._id,
        commentData: { name: commentName, email: commentEmail, comment: commentText }
      }));
    } else {
      // Mock comment addition
      const mockActiveData = JSON.parse(sessionStorage.getItem('mockActive') || '{}');
      if (mockActiveData.comments) {
        mockActiveData.comments.unshift({
          name: commentName,
          comment: commentText,
          createdAt: new Date().toISOString()
        });
        sessionStorage.setItem('mockActive', JSON.stringify(mockActiveData));
      }
    }

    setCommentSuccess(true);
    setCommentText('');
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Rendering Individual Article Reader Mode
  if (activeBlog || (sessionStorage.getItem('mockActive'))) {
    const renderBlog = activeBlog || JSON.parse(sessionStorage.getItem('mockActive') || '{}');
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          onClick={handleBackToList}
          className="flex items-center space-x-2 text-sm text-slate-400 hover:text-brand-cyan transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Articles</span>
        </button>

        {/* Article Meta Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-bold border border-brand-purple/20">
            {renderBlog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {renderBlog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center space-x-1.5">
              <Calendar size={14} />
              <span>{formatDate(renderBlog.publishedAt || renderBlog.createdAt)}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <User size={14} />
              <span>{renderBlog.author?.name || 'Administrator'}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Eye size={14} />
              <span>{renderBlog.views} views</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5">
          <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base font-sans">
            {renderBlog.content}
          </p>
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <MessageSquare size={20} className="text-brand-cyan" />
            <span>Comments ({renderBlog.comments?.length || 0})</span>
          </h3>

          {/* New Comment Submission Form */}
          <form onSubmit={handleCommentSubmit} className="glass-card p-6 rounded-xl border border-white/5 space-y-4">
            <h4 className="text-sm font-bold text-slate-300">Join the discussion</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={commentEmail}
                onChange={(e) => setCommentEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <textarea
              required
              rows="4"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan resize-none"
            ></textarea>
            
            <div className="flex items-center justify-between">
              {commentSuccess && (
                <span className="text-xs text-emerald-400 font-semibold animate-pulse">Comment submitted!</span>
              )}
              <button
                type="submit"
                className="gradient-btn flex items-center space-x-1.5 text-xs py-2 px-4 shadow-sm ml-auto"
              >
                <span>Submit Comment</span>
                <Send size={12} />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4 pt-4">
            {renderBlog.comments && renderBlog.comments.length > 0 ? (
              renderBlog.comments.map((c, cIdx) => (
                <div key={c._id || cIdx} className="glass-card p-5 rounded-xl border border-white/5 flex flex-col space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-200">{c.name}</span>
                    <span className="text-slate-500">{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-455 leading-relaxed">{c.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic text-center py-4">Be the first to leave a comment!</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Rendering Articles list view
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Insights <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          Deep dives into software architectures, deployment guides, security insights, and career engineering notes.
        </p>
      </div>

      {/* Control bar (Search + Categories) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-800/80 pb-6">
        {/* Search Box */}
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        {/* Categories Scroller */}
        <div className="md:col-span-8 flex items-center gap-2 overflow-x-auto pb-1.5 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-slate-800 text-brand-cyan border border-slate-700/60 shadow'
                  : 'bg-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-900/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayBlogs.map((blog, idx) => (
            <motion.article
              key={blog.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleSelectBlog(blog.slug)}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-purple/20 transition-all duration-350 cursor-pointer group hover:translate-y-[-2px] relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 bg-brand-purple/10 text-brand-purple text-[10px] font-extrabold uppercase rounded-full border border-brand-purple/20">
                    {blog.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">{formatDate(blog.publishedAt || blog.createdAt)}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-extrabold text-lg text-slate-100 group-hover:text-brand-cyan transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Action read indicator */}
              <div className="pt-6 mt-6 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-500 font-semibold group-hover:text-brand-cyan transition-colors">
                <span className="flex items-center space-x-1">
                  <Eye size={12} />
                  <span>{blog.views || 0} views</span>
                </span>
                <span>Read Article &rarr;</span>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {!loading && displayBlogs.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-sm">
          No articles found matching your parameters.
        </div>
      )}
    </div>
  );
};

export default Blog;
