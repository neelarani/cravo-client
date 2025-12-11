'use client';

const AboutUs = () => {
  return (
    <div className="bg-chadcn-background text-chadcn-foreground mt-24">
      {/* Hero Section */}
      <section className="py-20 text-center ">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Welcome to our restaurant! We are passionate about delivering the
          finest food with exceptional service.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-card p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            To provide delicious meals with the freshest ingredients, ensuring
            every customer leaves satisfied and happy.
          </p>
        </div>
        <div className="bg-card p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-muted-foreground">
            To become the leading restaurant in quality and taste, creating
            memorable dining experiences for everyone.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/20">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Example Team Member */}
          <div className="bg-card rounded-xl shadow-lg overflow-hidden text-center p-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center text-3xl font-bold text-white">
              A
            </div>
            <h3 className="text-xl font-semibold mb-2">Alice</h3>
            <p className="text-muted-foreground text-sm">
              Head Chef with 10+ years of experience.
            </p>
          </div>
          <div className="bg-card rounded-xl shadow-lg overflow-hidden text-center p-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center text-3xl font-bold text-white">
              B
            </div>
            <h3 className="text-xl font-semibold mb-2">Bob</h3>
            <p className="text-muted-foreground text-sm">
              Restaurant Manager ensuring top-notch service.
            </p>
          </div>
          {/* আরও team members add করতে পারেন */}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
