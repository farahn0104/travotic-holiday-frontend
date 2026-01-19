import { configureStore } from '@reduxjs/toolkit';
import packagesReducer from '../features/packages/packagesSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import enquiriesReducer from '../features/enquiries/enquiriesSlice';
import blogsReducer from '../features/blogs/blogsSlice';
import galleryReducer from '../features/gallery/gallerySlice';
import bookingsReducer from '../features/bookings/bookingsSlice';

export const store = configureStore({
    reducer: {
        packages: packagesReducer,
        categories: categoriesReducer,
        enquiries: enquiriesReducer,
        blogs: blogsReducer,
        gallery: galleryReducer,
        bookings: bookingsReducer,
    },
});
