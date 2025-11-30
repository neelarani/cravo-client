'use client';

import Image from 'next/image';

export default function ChefSection() {
  const chef = {
    name: 'Chef Rahim Khan',
    bio: 'With over 12 years of culinary experience, Chef Rahim specializes in Continental and Asian fusion dishes. His creativity brings unique flavors to every plate.',
    experience: '12+ Years Experience',
    img: 'https://i.ibb.co/1G1Zb91/chef1.jpg',
  };

  return (
    <div className="bg-chadcn-background py-20 px-4">
      <h1 className="text-4xl font-bold text-center text-chadcn-foreground mb-12">
        Meet Our Chef
      </h1>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 bg-chadcn-card shadow-chadcn rounded-2xl p-8 lg:p-14 hover:scale-[1.02] transition-transform duration-300">
        {/* Chef Image */}
        <div className="w-full lg:w-1/2">
          <Image
            src={chef.img}
            alt={chef.name}
            width={600}
            height={500}
            className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Chef Details */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-chadcn-foreground mb-3">
            {chef.name}
          </h2>

          <h3 className="text-xl font-semibold text-chadcn-primary mb-4">
            {chef.experience}
          </h3>

          <p className="text-lg text-chadcn-muted leading-relaxed mb-6">
            {chef.bio}
          </p>

          <button className="bg-chadcn-primary px-6 py-2 rounded-xl font-semibold hover:bg-chadcn-primary-hover transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
