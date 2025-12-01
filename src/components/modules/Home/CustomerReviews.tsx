'use client';

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function CustomerReviews() {
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
