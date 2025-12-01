'use client';

import Image from 'next/image';
import { menuApi } from '@/redux';
import { useParams } from 'next/navigation';
import { IMenu } from '@/types/menu.types';

const FeaturesMenuDetails = () => {
  const params = useParams();
  const { id } = params as { id: string };

  const { data, isLoading, error } = menuApi.useGetSingleMenuQuery(id!);
  const dish: IMenu = data?.data;

  if (isLoading)
    return (
      <p className="text-center mt-20 text-muted-foreground">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-destructive">Failed to load dish.</p>
    );

  if (!dish)
    return (
      <p className="text-center mt-20 text-muted-foreground">Dish not found.</p>
    );

  return (
    <div className="min-h-screen py-16 px-4 bg-muted ">
      <div className="container px-12 mx-auto bg-card shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 mt-24">
        {/* LEFT IMAGE */}
        <div className="w-full h-full">
          <Image
            src={dish.img}
            alt={dish.name}
            width={800}
            height={800}
            className="w-full h-80 md:h-full object-cover"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-card-foreground">
            {dish.name}
          </h1>

          {dish.title && (
            <h2 className="text-2xl text-muted-foreground mb-4">
              {dish.title}
            </h2>
          )}

          <p className="text-xl font-semibold text-primary mb-4">
            ${dish.price}
          </p>

          <p className="text-muted-foreground mb-4">{dish.description}</p>

          <p className="text-muted-foreground font-semibold mb-6">
            Category: {dish.category}
          </p>

          <button className="bg-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all w-fit cursor-pointer">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesMenuDetails;
