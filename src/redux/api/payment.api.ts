import { IResponse } from '@/types/common.types';
import { baseApi } from '../baseApi';
import { ICreatePaymentData } from '@/types/payment.types';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPayment: build.mutation<
      IResponse<ICreatePaymentData>,
      {
        foodId: string;
        quantity: number;
        paymentMethod: 'COD' | 'ONLINE';
      }
    >({
      query: body => ({
        url: '/payment/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PAYMENT'],
    }),
  }),
});
