import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, MessageSquare, PlusCircle, CheckCircle, Trash2, Shield, Eye, FileSpreadsheet, Server } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStats, fetchContactsList, changeContactStatus, deleteContactMsg } from '../store/slices/dashboardSlice';
import { addSkill, addProject } from '../store/slices/portfolioSlice';
import { addBlog } from '../store/slices/blogsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, contacts, loading } = useSelector((state) => state.dashboard);
  const [activeTab, setActiveTab] = useState('analytics');

  // Skill Form State
  const [skillName, setSkillName] = useState('');
  const [skillProficiency, setSkillProficiency] = useState(80);
  const [skillCategory, setSkillCategory] = useState('Programming Languages');

  // Project Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectCat, setProjectCat] = useState('Web Development');
  const [projectTech, setProjectTech] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectLive, setProjectLive] = useState('');

  // Blog Form State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('Programming Languages');
  const [blogTags, setBlogTags] = useState('');
  const [blogStatus, setBlogStatus] = useState('Draft');

  const [formFeedback, setFormFeedback] = useState('');

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchContactsList());
  }, [dispatch]);

  const handleUpdateStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'New' ? 'In-Progress' : 'Resolved';
    dispatch(changeContactStatus({ id, statusData: { status: nextStatus, isRead: true } }));
  };

  const handleDeleteMessage = (id) => {
    if (window.confirm('Delete this message?')) {
      dispatch(deleteContactMsg(id));
    }
  };

  const handleCreateSkill = (e) => {
    e.preventDefault();
    if (!skillName) return;
    dispatch(addSkill({ name: skillName, proficiency: Number(skillProficiency), category: skillCategory }));
    setSkillName('');
    triggerFeedback('Skill created successfully!');
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectTitle || !projectDesc) return;
    
    const technologies = projectTech.split(',').map((t) => t.trim()).filter(Boolean);
    const fd = new FormData();
    fd.append('title', projectTitle);
    fd.append('description', projectDesc);
    fd.append('category', projectCat);
    fd.append('technologies', JSON.stringify(technologies));
    fd.append('githubUrl', projectGithub);
    fd.append('liveUrl', projectLive);

    dispatch(addProject(fd));
    setProjectTitle('');
    setProjectDesc('');
    setProjectTech('');
    setProjectGithub('');
    setProjectLive('');
    triggerFeedback('Project created successfully!');
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (!blogTitle || !blogContent || !blogExcerpt) return;

    const tags = blogTags.split(',').map((t) => t.trim()).filter(Boolean);
    const fd = new FormData();
    fd.append('title', blogTitle);
    fd.append('excerpt', blogExcerpt);
    fd.append('content', blogContent);
    fd.append('category', blogCategory);
    fd.append('tags', JSON.stringify(tags));
    fd.append('status', blogStatus);

    dispatch(addBlog(fd));
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogTags('');
    triggerFeedback('Blog post created successfully!');
  };

  const triggerFeedback = (msg) => {
    setFormFeedback(msg);
    setTimeout(() => setFormFeedback(''), 4000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Mock analytics in case API hasn't loaded yet
  const displayStats = stats || {
    summary: {
      blogs: 2,
      projects: 3,
      contacts: 1,
      skills: 10,
      certifications: 3,
      blogViews: 222,
      unreadContacts: 1,
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-2">
            <Shield className="text-brand-cyan" size={28} />
            <span>Dashboard Console</span>
          </h1>
          <p className="text-xs text-slate-500">
            Control center to update portfolios, manage inquiries, and inspect visitor metrics.
          </p>
        </div>

        {/* Tab Controls Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-slate-800 text-brand-cyan shadow'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <LayoutDashboard size={14} />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all relative ${
              activeTab === 'messages'
                ? 'bg-slate-800 text-brand-cyan shadow'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <MessageSquare size={14} />
            <span>Messages</span>
            {displayStats.summary.unreadContacts > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'cms'
                ? 'bg-slate-800 text-brand-cyan shadow'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <PlusCircle size={14} />
            <span>CMS Content</span>
          </button>
        </div>
      </div>

      {formFeedback && (
        <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs rounded-lg animate-pulse text-center">
          {formFeedback}
        </div>
      )}

      {/* Tab Pages rendering */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Analytical Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">Inquiries Received</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{displayStats.summary.contacts}</h3>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">Blog Publications</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{displayStats.summary.blogs}</h3>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">Article Reads</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center space-x-2">
                <Eye size={18} className="text-brand-cyan" />
                <span>{displayStats.summary.blogViews}</span>
              </h3>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">Skills Listed</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{displayStats.summary.skills}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider flex items-center space-x-2">
                <Server size={16} className="text-brand-cyan" />
                <span>Infrastructure Metrics</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800/40">
                  <span className="text-slate-400">Database Engine</span>
                  <span className="text-slate-200 font-mono">MongoDB / Mongoose 7.x</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/40">
                  <span className="text-slate-400">Server Framework</span>
                  <span className="text-slate-200 font-mono">Express.js / Node 18</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Reverse Proxy</span>
                  <span className="text-slate-200 font-mono">Nginx Container</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider flex items-center space-x-2">
                <FileSpreadsheet size={16} className="text-brand-purple" />
                <span>API Status Checks</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800/40">
                  <span className="text-slate-400">Swagger API docs</span>
                  <a href="/api-docs" target="_blank" className="text-brand-cyan hover:underline">/api-docs &rarr;</a>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/40">
                  <span className="text-slate-400">Rate Limits</span>
                  <span className="text-slate-200">100 req / 10m limiters</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">CORS Protection</span>
                  <span className="text-slate-200">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-200 text-sm uppercase">Visitor Contact Logs</h3>
          
          {contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.map((msg) => (
                <div
                  key={msg._id}
                  className={`glass-card p-6 rounded-xl border relative ${
                    !msg.isRead ? 'border-brand-cyan/30 bg-slate-900/60' : 'border-slate-800/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{msg.name} ({msg.email})</h4>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Subject: {msg.subject}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{formatDate(msg.createdAt)}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-350 bg-slate-950/40 p-3 rounded-lg border border-slate-900 mb-4 whitespace-pre-line leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="flex items-center space-x-3 text-xs pt-3 border-t border-slate-900">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      msg.status === 'New' ? 'bg-rose-500/10 text-rose-400' :
                      msg.status === 'In-Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {msg.status}
                    </span>

                    {msg.status !== 'Resolved' && (
                      <button
                        onClick={() => handleUpdateStatus(msg._id, msg.status)}
                        className="text-brand-cyan hover:underline flex items-center space-x-1"
                      >
                        <CheckCircle size={12} />
                        <span>Move to {msg.status === 'New' ? 'In-Progress' : 'Resolved'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteMessage(msg._id)}
                      className="text-rose-455 hover:underline flex items-center space-x-1 ml-auto"
                    >
                      <Trash2 size={12} />
                      <span>Delete Log</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic text-center py-12">No contact messages received.</p>
          )}
        </div>
      )}

      {activeTab === 'cms' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Form */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-bold text-slate-200 text-sm uppercase">Add Skill Category Item</h3>
            <form onSubmit={handleCreateSkill} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Skill Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Lambda / TypeScript"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Proficiency Rating (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skillProficiency}
                    onChange={(e) => setSkillProficiency(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Category Group</label>
                  <select
                    value={skillCategory}
                    onChange={(e) => setSkillCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none"
                  >
                    <option>Programming Languages</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Database</option>
                    <option>Cloud Computing</option>
                    <option>Cyber Security</option>
                    <option>Networking</option>
                    <option>DevOps</option>
                    <option>AI & Machine Learning</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="gradient-btn py-2.5 px-4 w-full shadow-sm text-xs mt-2">
                Save Skill
              </button>
            </form>
          </div>

          {/* Project Form */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-bold text-slate-200 text-sm uppercase">Add Project Item</h3>
            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Serverless Gateway API"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Project Description</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Summarize features..."
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Technologies (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, AWS, Node, JWT"
                    value={projectTech}
                    onChange={(e) => setProjectTech(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Category Group</label>
                  <select
                    value={projectCat}
                    onChange={(e) => setProjectCat(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none"
                  >
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Cloud Computing</option>
                    <option>Cyber Security</option>
                    <option>DevOps</option>
                    <option>AI & Machine Learning</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Source Repo Link</label>
                  <input
                    type="url"
                    placeholder="https://github.com"
                    value={projectGithub}
                    onChange={(e) => setProjectGithub(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Live Site Link</label>
                  <input
                    type="url"
                    placeholder="https://website.com"
                    value={projectLive}
                    onChange={(e) => setProjectLive(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200"
                  />
                </div>
              </div>

              <button type="submit" className="gradient-btn py-2.5 px-4 w-full shadow-sm text-xs mt-2">
                Save Project
              </button>
            </form>
          </div>

          {/* Blog Form */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4 lg:col-span-2">
            <h3 className="font-bold text-slate-200 text-sm uppercase">Compose Blog Post</h3>
            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Article Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Constructing Secure Kubernetes Architectures"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Short Excerpt (Summary)</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief intro details..."
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Post Content</label>
                <textarea
                  rows="8"
                  required
                  placeholder="Markdown or standard text post body content details..."
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none resize-none font-sans leading-relaxed"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Category Group</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200"
                  >
                    <option>Programming Languages</option>
                    <option>Web Development</option>
                    <option>Cloud Computing</option>
                    <option>Cyber Security</option>
                    <option>DevOps</option>
                    <option>AI & Machine Learning</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="aws, security, kubernetes"
                    value={blogTags}
                    onChange={(e) => setBlogTags(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Publishing Status</label>
                  <select
                    value={blogStatus}
                    onChange={(e) => setBlogStatus(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="gradient-btn py-3 px-6 w-full shadow-sm text-xs mt-2">
                Save Blog Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
