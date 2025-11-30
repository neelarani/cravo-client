import { ForgotPasswordPayload, IResponse } from '@/types/common.types';
import { baseApi } from '../baseApi';
import { IUser } from '@/types/user.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    userInfo: build.query<IResponse<IUser>, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),

    register: build.mutation<
      IResponse<IUser>,
      { email: string; password: string; full_name: string; phone: string }
    >({
      query: body => ({
        url: '/user/register',
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['USER'],
    }),

    login: build.mutation<
      IResponse<IUser>,
      { email: string; password: string }
    >({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
      invalidatesTags: ['USER'],
    }),

    getMe: build.query<IResponse<IUser>, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['USER'],
    }),

    logout: build.mutation<IResponse<null>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),

    forgotPassword: build.mutation<
      IResponse<{ email: string }>,
      ForgotPasswordPayload
    >({
      query: payload => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),

    resetPassword: build.mutation<
      IResponse<{ email: string }>,
      { password: string; token: string }
    >({
      query: payload => ({
        url: `/auth/reset-password?token=${payload.token}`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});
