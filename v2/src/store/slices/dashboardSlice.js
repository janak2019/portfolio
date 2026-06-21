import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './authSlice';

// Fetch stats
export const fetchStats = createAsyncThunk('dashboard/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/dashboard/stats');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to fetch analytics');
  }
});

// Fetch contacts list
export const fetchContactsList = createAsyncThunk('dashboard/fetchContacts', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/contacts');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load messages');
  }
});

// Update contact status
export const changeContactStatus = createAsyncThunk('dashboard/updateContactStatus', async ({ id, statusData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/contacts/${id}`, statusData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to update message status');
  }
});

// Delete contact
export const deleteContactMsg = createAsyncThunk('dashboard/deleteContact', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/contacts/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to delete message');
  }
});

const initialState = {
  stats: null,
  contacts: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError(state) {
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
      // Fetch stats
      .addCase(fetchStats.pending, setPending)
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, setRejected)

      // Fetch messages list
      .addCase(fetchContactsList.pending, setPending)
      .addCase(fetchContactsList.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsList.rejected, setRejected)

      // Status updates
      .addCase(changeContactStatus.fulfilled, (state, action) => {
        const index = state.contacts.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.contacts[index] = action.payload;
      })
      .addCase(deleteContactMsg.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((c) => c._id !== action.payload);
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
