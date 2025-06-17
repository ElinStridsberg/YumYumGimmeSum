import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchApiKey = createAsyncThunk('auth/fetchApiKey', async () => {
    const resp = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST',
      });      
  const data = await resp.json();
  return data.key;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { apiKey: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKey.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApiKey.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.apiKey = action.payload;
      })
      .addCase(fetchApiKey.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
