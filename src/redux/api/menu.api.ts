import { IMenu } from '@/types/menu.types';
import { baseApi } from '../baseApi';

export const menuApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createMenu: build.mutation<
      { success: boolean; message: string; data: IMenu },
      FormData
    >({
      query: formData => ({
        url: '/menu/create-menu',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['MENU'],
    }),

    getAllMenus: build.query<IMenu[], void>({
      query: () => ({
        url: '/menu',
        method: 'GET',
      }),
      providesTags: ['MENU'],
    }),
    getSingleMenu: build.query<IMenu, string>({
      query: id => ({
        url: `/menu/${id}`,
        method: 'GET',
      }),
      providesTags: ['MENU'],
    }),

    updateMenu: build.mutation<
      { success: boolean; message: string; data: IMenu },
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/menu/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MENU'],
    }),

    deleteMenu: build.mutation<{ success: boolean; message: string }, string>({
      query: id => ({
        url: `/menu/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MENU'],
    }),
  }),
});
