'use client';

import Image from 'next/image';

export default function GallerySection() {
  const gallery = [
    {
      id: 1,
      img: 'https://i.ibb.co/6RQmfBP/rest1.jpg',
    },
    {
      id: 2,
      img: 'https://i.ibb.co/9gRNtqx/rest2.jpg',
    },
    {
      id: 3,
      img: 'https://i.ibb.co/2ckMXFq/rest3.jpg',
    },
    {
      id: 4,
      img: 'https://i.ibb.co/kcZxjjp/food1.jpg',
    },
    {
      id: 5,
      img: 'https://i.ibb.co/hgMn3pv/food2.jpg',
    },
    {
      id: 6,
      img: 'https://i.ibb.co/qnY69Vv/food3.jpg',
    },
    {
      id: 7,
      img: 'https://i.ibb.co/4Vyh0Tr/food4.jpg',
    },
    {
      id: 8,
      img: 'https://i.ibb.co/tBBXzFf/food5.jpg',
    },
  ];

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
