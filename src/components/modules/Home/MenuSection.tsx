'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function MenuSection() {
  // New categories
  const categories = ['All Items', 'Desserts', 'Drinks', 'Rices'];

  const foods = [
    {
      id: 1,
      category: 'Rices',
      name: 'Chicken Biryani',
      price: '৳250',
      img: 'https://i.ibb.co/Vmm0xwN/biryani.jpg',
    },
    {
      id: 2,
      category: 'Rices',
      name: 'Kacchi Biryani',
      price: '৳320',
      img: 'https://i.ibb.co/Vmm0xwN/biryani.jpg',
    },
    {
      id: 3,
      category: 'Desserts',
      name: 'Chocolate Cake',
      price: '৳200',
      img: 'https://i.ibb.co/pjJvWQz/chocolate-cake.jpg',
    },
    {
      id: 4,
      category: 'Desserts',
      name: 'Ice Cream',
      price: '৳150',
      img: 'https://i.ibb.co/J7JxYB6/ice-cream.jpg',
    },
    {
      id: 5,
      category: 'Drinks',
      name: 'Lemonade',
      price: '৳80',
      img: 'https://i.ibb.co/jHRZ6Xs/lemonade.jpg',
    },
    {
      id: 6,
      category: 'Drinks',
      name: 'Iced Tea',
      price: '৳90',
      img: 'https://i.ibb.co/kBXgQ8h/iced-tea.jpg',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Items');

  const filteredFoods =
    selectedCategory === 'All Items'
      ? foods
      : foods.filter(food => food.category === selectedCategory);

  return (
    <div className="min-h-screen bg-muted/50">
      <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
        Menu
      </h1>

      <div className="container px-6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-card shadow rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Categories</h2>

          <div className="flex md:flex-col gap-4">
            {categories.map(cat => (
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
              key={food.id}
              className="bg-card shadow rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={food.img}
                alt={food.name}
                width={400}
                height={400}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-semibold text-foreground mb-1">
                  {food.name}
                </h2>
                <p className="text-lg text-primary font-bold mb-2">
                  {food.price}
                </p>

                <button className="w-full bg-chart-5 text-primary-foreground py-2 rounded-xl font-semibold hover:opacity-90 transition-all cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
