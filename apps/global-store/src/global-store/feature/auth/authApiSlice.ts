import { apiSlice } from '../../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export function AuthApiSlice() {
  const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials) => ({
          url: '/signin',
          method: 'POST',
          body: { ...credentials },
        }),
      }),
    }),
  });
  return { authApiSlice };
}

export const { useLoginMutation } = authApiSlice;
