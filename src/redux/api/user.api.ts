import { IResponse } from '@/types/common.types';
import { baseApi } from '../baseApi';
import { IUser } from '@/types/user.types';

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    allUser: build.query<IResponse<IUser[]>, void>({
      query: () => ({
        url: '/user/all-user',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
  }),
});
