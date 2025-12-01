const Hero = () => {
  return (
    <div
      className="w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddonxd2yp/image/upload/v1764583084/IMG-20230423-WA0029.jpg.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="bg-background/70 w-full h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-accent-foreground/80 mb-4">
            Welcome to Cravo Restaurant
          </h1>

          <p className="text-accent-foreground/70 text-lg md:text-xl mb-6">
            Taste the delicious foods cooked with passion & love.
          </p>

          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-lg hover:opacity-90 transition">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
