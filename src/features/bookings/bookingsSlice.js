import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants';

export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch bookings');
        }
    }
);

export const createBooking = createAsyncThunk(
    'bookings/createBooking',
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create booking');
        }
    }
);

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        items: [],
        currentBooking: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetBookingState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.currentBooking = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Bookings
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Booking
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentBooking = action.payload;
                state.items.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetBookingState } = bookingsSlice.actions;
export default bookingsSlice.reducer;
