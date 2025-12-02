import { baseApi } from '../baseApi';

export const orderApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createOrder: build.mutation<
      { success: boolean; message: string },
      FormData
    >({
      query: formData => ({
        url: '/order/create',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});
