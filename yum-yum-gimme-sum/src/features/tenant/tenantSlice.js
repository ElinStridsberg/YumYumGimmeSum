import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tenantApi = createApi({
  reducerPath: 'tenantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com',
    prepareHeaders: (headers, { getState }) => {
      const apiKey = getState().auth.apiKey;
      if (apiKey) headers.set('x-zocom', apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTenant: builder.mutation({
      query: (tenantName) => ({
        url: '/tenants',
        method: 'POST',
        body: { name: tenantName },
      }),
    }),
    placeOrder: builder.mutation({
      query: ({ tenantId, order }) => ({
        url: `/${tenantId}/orders`,
        method: 'POST',
        body: order,
      }),
    }),
    getReceipt: builder.query({
      query: (orderId) => `/receipts/${orderId}`,
    }),
  }),
});

export const {
  useCreateTenantMutation,
  usePlaceOrderMutation,
  useGetReceiptQuery,
} = tenantApi;
