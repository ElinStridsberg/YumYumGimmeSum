import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/authSlice';
import cartReducer from '../features/cart/cartSlice';
import { apiSlice } from './apiSlice';
import { tenantApi } from '../features/tenant/tenantSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [tenantApi.reducerPath]: tenantApi.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(tenantApi.middleware), 
});
