import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants';

export const fetchBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogs`); // Assuming API_ENDPOINTS.BLOGS might not exist, using hardcoded or derived path
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch blogs');
        }
    }
);

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default blogsSlice.reducer;
