import { IGallery } from '@/types/gallery.types';
import { baseApi } from '../baseApi';

export const galleryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createGallery: build.mutation<
      { success: boolean; message: string; data: IGallery },
      FormData
    >({
      query: formData => ({
        url: '/gallery/create-gallery',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['GALLERY'],
    }),

    getAllGallery: build.query<IGallery[], void>({
      query: () => ({
        url: '/gallery',
        method: 'GET',
      }),
      providesTags: ['GALLERY'],
    }),
  }),
});
