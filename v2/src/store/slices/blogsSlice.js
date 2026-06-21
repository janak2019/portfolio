import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './authSlice';

// Fetch all published blogs (supports search & filter)
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (params = {}, { rejectWithValue }) => {
  try {
    const { category, search, tag, status } = params;
    let url = '/blogs?';
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (tag) url += `tag=${encodeURIComponent(tag)}&`;
    if (status) url += `status=${encodeURIComponent(status)}&`;

    const res = await API.get(url);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to fetch blogs');
  }
});

// Fetch single blog by slug
export const fetchBlogBySlug = createAsyncThunk('blogs/fetchBlogBySlug', async (slug, { rejectWithValue }) => {
  try {
    const res = await API.get(`/blogs/slug/${slug}`);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load article');
  }
});

// Create Blog
export const addBlog = createAsyncThunk('blogs/addBlog', async (blogFormData, { rejectWithValue }) => {
  try {
    const res = await API.post('/blogs', blogFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to create blog post');
  }
});

// Update Blog
export const editBlog = createAsyncThunk('blogs/editBlog', async ({ id, blogFormData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/blogs/${id}`, blogFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to update blog post');
  }
});

// Delete Blog
export const removeBlog = createAsyncThunk('blogs/deleteBlog', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/blogs/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to delete blog post');
  }
});

// Add comment
export const addCommentToBlog = createAsyncThunk('blogs/addComment', async ({ blogId, commentData }, { rejectWithValue }) => {
  try {
    const res = await API.post(`/blogs/${blogId}/comments`, commentData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to post comment');
  }
});

const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearCurrentBlog(state) {
      state.currentBlog = null;
    },
    clearBlogsError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const setRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // Fetch Blogs
      .addCase(fetchBlogs.pending, setPending)
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, setRejected)

      // Fetch Single Blog
      .addCase(fetchBlogBySlug.pending, setPending)
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, setRejected)

      // Blog Mutations
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.blogs[index] = action.payload;
        if (state.currentBlog && state.currentBlog._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })

      // Add Comment
      .addCase(addCommentToBlog.fulfilled, (state, action) => {
        if (state.currentBlog) {
          state.currentBlog.comments = action.payload;
        }
      });
  },
});

export const { clearCurrentBlog, clearBlogsError } = blogsSlice.actions;
export default blogsSlice.reducer;
