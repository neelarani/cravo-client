'use client';

import { galleryApi } from '@/redux/api/gallery.api';
import { IGallery } from '@/types/gallery.types';
import Image from 'next/image';

export default function GallerySection() {
  const { data } = galleryApi.useGetAllGalleryQuery();
  const gallery: IGallery[] = data?.data || [];

  console.log(gallery);
  return (
    <div className="bg-chadcn-background py-20 px-4">
      <h1 className="text-4xl font-bold text-center text-chadcn-foreground mb-12">
        Our Gallery
      </h1>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
        {gallery.map(photo => (
          <div
            key={photo.id}
            className="mb-4 overflow-hidden rounded-2xl shadow-chadcn break-inside-avoid"
          >
            <Image
              src={photo.img}
              alt="Restaurant gallery image"
              width={600}
              height={400}
              className="w-full h-auto object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
