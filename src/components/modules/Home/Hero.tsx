import Link from 'next/link';

const Hero = () => {
  return (
    <div
      className="w-full h-[80vh] bg-cover bg-center flex items-center justify-center "
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddonxd2yp/image/upload/v1764689246/restuarent_o66jqp.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="bg-black/60 w-full h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-accent mb-4">
            Welcome to cravo Restaurant
          </h1>

          <p className="text-accent/60 text-lg md:text-xl mb-6">
            Taste the delicious foods cooked with passion & love.
          </p>

          <Link
            href={'/features-menu'}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-lg hover:opacity-90 transition"
          >
            View Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
