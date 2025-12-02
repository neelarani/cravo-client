'use client';

import { galleryApi } from '@/redux/api/gallery.api';
import { IGallery } from '@/types/gallery.types';
import Image from 'next/image';

export default function GallerySection() {
  const { data } = galleryApi.useGetAllGalleryQuery();
  const gallery: IGallery[] = data?.data || [];

  return (
    <div className="bg-chadcn-background py-20 px-4">
      <h1 className="text-4xl font-bold text-center text-chadcn-foreground mb-12">
        Our Gallery
      </h1>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 container mx-auto">
        {gallery.map(photo => (
          <div
            key={photo.title}
            className="mb-4 relative overflow-hidden rounded-2xl shadow-chadcn break-inside-avoid group"
          >
            {/* Image with hover zoom */}
            <Image
              src={photo.img}
              alt={photo.title}
              width={300}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />

            {/* Overlay with fade-in */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-center items-center text-center p-4">
              <h3 className="text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                {photo.title}
              </h3>
              {photo.category && (
                <p className="text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  {photo.category}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
