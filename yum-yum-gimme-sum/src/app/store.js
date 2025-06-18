import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/authSlice';
import cartReducer from '../features/cart/cartSlice';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});