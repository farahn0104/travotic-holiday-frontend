import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants';

// Async thunk to submit enquiry
export const submitEnquiry = createAsyncThunk(
    'enquiries/submitEnquiry',
    async (enquiryData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.ENQUIRIES}`, enquiryData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to submit enquiry');
        }
    }
);

const enquiriesSlice = createSlice({
    name: 'enquiries',
    initialState: {
        submissions: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetEnquiryState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitEnquiry.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitEnquiry.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.submissions.push(action.payload);
            })
            .addCase(submitEnquiry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetEnquiryState } = enquiriesSlice.actions;
export default enquiriesSlice.reducer;
