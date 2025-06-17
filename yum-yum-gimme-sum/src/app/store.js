import { configureStore } from '@reduxjs/toolkit';

// Tillfällig dummy reducer
const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    dummy: dummyReducer
  },
});
