'use client';

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: 'Arif Hossain',
      photo: 'https://i.ibb.co/vCyYXTr/user1.png',
      rating: 5,
      text: 'Amazing food! The taste was fantastic and delivery was super fast. Highly recommended!',
    },
    {
      id: 2,
      name: 'Nusrat Jahan',
      photo: 'https://i.ibb.co/FH8qSdf/user2.png',
      rating: 4,
      text: 'Really good quality food. The chicken biryani was delicious. Will order again!',
    },
    {
      id: 3,
      name: 'Sabbir Rahman',
      photo: 'https://i.ibb.co/D1JTSqs/user3.png',
      rating: 5,
      text: 'Exceptional service and mouth-watering dishes. Loved the dessert section!',
    },
    {
      id: 4,
      name: 'Mitu Akter',
      photo: 'https://i.ibb.co/fCM1tHT/user4.png',
      rating: 4,
      text: 'Good packaging and the food remained hot. Presentation was also great.',
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
