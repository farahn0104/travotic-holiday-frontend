import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants';

export const fetchGallery = createAsyncThunk(
    'gallery/fetchGallery',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GALLERY}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch gallery');
        }
    }
);

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGallery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGallery.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchGallery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default gallerySlice.reducer;
