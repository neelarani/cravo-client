import { IResponse } from '@/types/common.types';
import { baseApi } from '../baseApi';
import { IOrder } from '@/types/order.types';

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

    allOrder: build.query<IResponse<IOrder[]>, void>({
      query: () => ({
        url: '/order/all-order',
        method: 'GET',
      }),
      providesTags: ['ORDER'],
    }),
  }),
});
