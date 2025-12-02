'use client';

import { menuApi } from '@/redux';
import { ArrowBigRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function MenuSection() {
  const categories = ['All Items', 'Pizza', 'Drinks', 'Biryani', 'Burger'];

  console.log(categories, 'cat');
  const [selectedCategory, setSelectedCategory] = useState('All Items');

  const { data, isLoading, error } = menuApi.useGetAllMenusQuery();

  const foods = data?.data || [];

  if (isLoading) return <p className="text-center mt-10">Loading menu...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-destructive">Failed to load menu.</p>
    );
  if (!foods || !Array.isArray(foods) || foods.length === 0)
    return (
      <p className="text-center mt-10 text-muted-foreground">
        No menu items available.
      </p>
    );

  const filteredFoods =
    selectedCategory === 'All Items'
      ? foods
      : foods.filter(food => food.category === selectedCategory);

  return (
    <div className="min-h-screen bg-muted/50 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
        Menu
      </h1>

      <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-card shadow rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Categories</h2>

          <div className="flex md:flex-col gap-4">
            {categories?.map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg cursor-pointer font-semibold transition-colors text-left ${
                  selectedCategory === cat
                    ? 'bg-primary/50 text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFoods.slice(0, 6).map(food => (
            <div
              key={food._id}
              className="bg-card shadow rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              {typeof food.img === 'string' ? (
                <Image
                  src={food.img}
                  alt={food.name}
                  width={400}
                  height={400}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}

              <div className="p-5">
                <h2 className="text-2xl font-semibold text-foreground mb-1">
                  {food.name}
                </h2>
                <p className="text-base text-primary font-semibold mb-2">
                  {food.description}
                </p>
                <p className="text-lg text-primary font-semibold mb-2">
                  {food.category}
                </p>
                <p className="text-lg text-primary font-semibold mb-2">
                  ${food.price}
                </p>

                <Link
                  href={`/features-menu/${food._id}`}
                  className="w-full bg-chart-5 text-primary-foreground py-2 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Details
                  <ArrowBigRight />
                </Link>
              </div>
            </div>
          ))}

          {filteredFoods.length === 0 && (
            <p className="text-center col-span-full text-muted-foreground mt-10">
              No items in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
