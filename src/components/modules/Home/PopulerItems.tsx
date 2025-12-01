/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';

import { menuApi } from '@/redux';
import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';
import { IMenu } from '@/types/menu.types';

export default function PopularItems() {
  const { data, isLoading, error } = menuApi.useGetAllMenusQuery();

  const dishes: IMenu = data?.data || [];

  return (
    <div className="min-h-screen bg-muted/50 py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">
        Featured Dishes
      </h1>

      {isLoading && (
        <p className="text-center text-lg text-muted-foreground">Loading...</p>
      )}
      {error && (
        <p className="text-center text-lg text-destructive">
          Failed to load dishes.
        </p>
      )}
      {!isLoading && dishes?.length === 0 && (
        <p className="text-center text-lg text-muted-foreground">
          No dishes available.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto container">
        {dishes.slice(0, 8).map(dish => (
          <div
            key={dish._id}
            className="bg-card text-card-foreground shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={dish?.img}
              alt={dish.name}
              width={400}
              height={400}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-1">{dish.name}</h2>
              <p className="text-lg font-bold mb-2 text-primary">
                ${dish.price}
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {dish.description}
              </p>
              <p className="text-muted-foreground text-sm mb-4 font-semibold">
                {dish.category}
              </p>

              <Link
                href={`/features-menu/${dish._id}`}
                className="w-full bg-chart-5 text-primary-foreground py-2 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Details
                <ArrowBigRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
