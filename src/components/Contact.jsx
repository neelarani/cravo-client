const Contact = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-card rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Have any questions or feedback? Send us a message and we’ll get back
          to you shortly.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Our Info</h2>
            <p className="text-muted-foreground">
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
            <p className="text-muted-foreground">
              <strong>Email:</strong> support@example.com
            </p>
            <p className="text-muted-foreground">
              <strong>Phone:</strong> +123 456 7890
            </p>
          </div>

          {/* Contact Form */}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
