'use client';

export default function Contact() {
  return (
    <div id="contact" className="bg-chadcn-background py-20 px-4">
      <h1 className="text-4xl font-bold text-center text-chadcn-foreground mb-12">
        Contact Us
      </h1>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 ">
        {/* Contact Info */}
        <div className="bg-chadcn-background  px-4">
          <div className="max-w-sm mx-auto flex flex-col gap-6">
            {/* Address Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-base">123 Food Street, Dhaka, Bangladesh</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-base">+880 123 456 789</p>
            </div>

            {/* Email Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-base">contact@foodhub.com</p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="rounded-2xl overflow-hidden shadow-chadcn h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8462238627014!2d90.39138907533663!3d23.75270208915708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf5a57e5a4f3%3A0x23c938ae2v3a8d1b!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
            width="100%"
            height="100%"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
