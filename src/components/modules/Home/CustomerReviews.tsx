'use client';

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'The food was amazing! Delivery was fast and the packaging was perfect. Highly recommend!',
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
      text: 'Great taste, but the portion size could be a bit bigger. Overall satisfied.',
    },
    {
      id: 3,
      name: 'Ali Rahman',
      photo: 'https://randomuser.me/api/portraits/men/56.jpg',
      rating: 5,
      text: 'Exceptional service and delicious food. Will definitely order again!',
    },
    {
      id: 4,
      name: 'Sara Khan',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 3,
      text: 'Food was okay, arrived slightly late. Taste is average.',
    },
    {
      id: 5,
      name: 'Michael Lee',
      photo: 'https://randomuser.me/api/portraits/men/78.jpg',
      rating: 4,
      text: 'Loved the burger and fries combo. Quick delivery and friendly service.',
    },
    {
      id: 6,
      name: 'Nadia Akter',
      photo: 'https://randomuser.me/api/portraits/women/88.jpg',
      rating: 5,
      text: 'Absolutely loved it! Fresh ingredients and amazing flavors.',
    },
  ];

  return (
    <div className="bg-chadcn-background py-20 px-4">
      <h1 className="text-4xl font-bold text-center text-chadcn-foreground mb-12">
        Customer Reviews
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {reviews.map(review => (
          <div
            key={review.id}
            className="bg-chadcn-card rounded-2xl shadow-chadcn p-6 hover:-translate-y-2 transition-all duration-300 border border-chadcn-border"
          >
            {/* Profile */}
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={review.photo}
                width={60}
                height={60}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-chadcn-foreground">
                  {review.name}
                </h3>

                {/* Star Rating */}
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-chadcn-muted text-base leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
