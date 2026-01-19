import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants';
import { useDispatch } from 'react-redux';

// Async thunk to fetch packages
export const fetchPackages = createAsyncThunk(
    'packages/fetchPackages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.PACKAGES}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch packages');
        }
    }
);


const packagesSlice = createSlice({
    name: 'packages',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPackages.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPackages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default packagesSlice.reducer;
