import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com',
    prepareHeaders: (headers, { getState }) => {
      const apiKey = getState().auth.apiKey;
      console.log('API key in headers:', apiKey);
      if (apiKey) {
        headers.set('x-zocom', apiKey);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => '/menu',
    }),
  }),
});

export const { useGetMenuQuery } = apiSlice;
