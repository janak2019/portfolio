import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './authSlice';

// Profile Thunks
export const fetchProfile = createAsyncThunk('portfolio/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/profile');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load profile');
  }
});

export const updateProfileInfo = createAsyncThunk('portfolio/updateProfile', async (formData, { rejectWithValue }) => {
  try {
    const res = await API.put('/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to update profile');
  }
});

// Skills Thunks
export const fetchSkills = createAsyncThunk('portfolio/fetchSkills', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/skills');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load skills');
  }
});

export const addSkill = createAsyncThunk('portfolio/addSkill', async (skillData, { rejectWithValue }) => {
  try {
    const res = await API.post('/skills', skillData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to add skill');
  }
});

export const editSkill = createAsyncThunk('portfolio/editSkill', async ({ id, skillData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/skills/${id}`, skillData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to update skill');
  }
});

export const removeSkill = createAsyncThunk('portfolio/deleteSkill', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/skills/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to delete skill');
  }
});

// Projects Thunks
export const fetchProjects = createAsyncThunk('portfolio/fetchProjects', async (category, { rejectWithValue }) => {
  try {
    const url = category ? `/projects?category=${encodeURIComponent(category)}` : '/projects';
    const res = await API.get(url);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load projects');
  }
});

export const addProject = createAsyncThunk('portfolio/addProject', async (projectFormData, { rejectWithValue }) => {
  try {
    const res = await API.post('/projects', projectFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to add project');
  }
});

export const editProject = createAsyncThunk('portfolio/editProject', async ({ id, projectFormData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/projects/${id}`, projectFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to update project');
  }
});

export const removeProject = createAsyncThunk('portfolio/deleteProject', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/projects/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to delete project');
  }
});

// Experiences Thunks
export const fetchExperiences = createAsyncThunk('portfolio/fetchExperiences', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/experiences');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load experiences');
  }
});

export const addExperience = createAsyncThunk('portfolio/addExperience', async (expData, { rejectWithValue }) => {
  try {
    const res = await API.post('/experiences', expData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to add experience');
  }
});

export const editExperience = createAsyncThunk('portfolio/editExperience', async ({ id, expData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/experiences/${id}`, expData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to update experience');
  }
});

export const removeExperience = createAsyncThunk('portfolio/deleteExperience', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/experiences/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to delete experience');
  }
});

// Educations Thunks
export const fetchEducations = createAsyncThunk('portfolio/fetchEducations', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/education');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load education details');
  }
});

export const addEducation = createAsyncThunk('portfolio/addEducation', async (eduData, { rejectWithValue }) => {
  try {
    const res = await API.post('/education', eduData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to add education record');
  }
});

export const editEducation = createAsyncThunk('portfolio/editEducation', async ({ id, eduData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/education/${id}`, eduData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to update education record');
  }
});

export const removeEducation = createAsyncThunk('portfolio/deleteEducation', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/education/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to delete education record');
  }
});

// Certifications Thunks
export const fetchCertifications = createAsyncThunk('portfolio/fetchCertifications', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/certifications');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load certifications');
  }
});

export const addCertification = createAsyncThunk('portfolio/addCertification', async (certFormData, { rejectWithValue }) => {
  try {
    const res = await API.post('/certifications', certFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to add certification');
  }
});

export const editCertification = createAsyncThunk('portfolio/editCertification', async ({ id, certFormData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/certifications/${id}`, certFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to update certification');
  }
});

export const removeCertification = createAsyncThunk('portfolio/deleteCertification', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/certifications/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to delete certification');
  }
});

const initialState = {
  profile: null,
  skills: [],
  projects: [],
  experiences: [],
  educations: [],
  certifications: [],
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearPortfolioError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // We consolidate status handlers to keep code tidy
    const setPending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const setRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // Profile
      .addCase(fetchProfile.pending, setPending)
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, setRejected)
      .addCase(updateProfileInfo.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // Skills
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.unshift(action.payload);
      })
      .addCase(editSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(removeSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((s) => s._id !== action.payload);
      })

      // Projects
      .addCase(fetchProjects.pending, setPending)
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, setRejected)
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.projects[index] = action.payload;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload);
      })

      // Experiences
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.experiences = action.payload;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.experiences.unshift(action.payload);
        state.experiences.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      })
      .addCase(editExperience.fulfilled, (state, action) => {
        const index = state.experiences.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.experiences[index] = action.payload;
      })
      .addCase(removeExperience.fulfilled, (state, action) => {
        state.experiences = state.experiences.filter((e) => e._id !== action.payload);
      })

      // Educations
      .addCase(fetchEducations.fulfilled, (state, action) => {
        state.educations = action.payload;
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.educations.unshift(action.payload);
        state.educations.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      })
      .addCase(editEducation.fulfilled, (state, action) => {
        const index = state.educations.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.educations[index] = action.payload;
      })
      .addCase(removeEducation.fulfilled, (state, action) => {
        state.educations = state.educations.filter((e) => e._id !== action.payload);
      })

      // Certifications
      .addCase(fetchCertifications.fulfilled, (state, action) => {
        state.certifications = action.payload;
      })
      .addCase(addCertification.fulfilled, (state, action) => {
        state.certifications.unshift(action.payload);
      })
      .addCase(editCertification.fulfilled, (state, action) => {
        const index = state.certifications.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.certifications[index] = action.payload;
      })
      .addCase(removeCertification.fulfilled, (state, action) => {
        state.certifications = state.certifications.filter((c) => c._id !== action.payload);
      });
  },
});

export const { clearPortfolioError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
