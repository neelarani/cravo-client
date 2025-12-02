import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const PublicFooter = () => {
  const navItems = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Menu' },
    { href: '#', label: 'Reservations' },
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Contact' },
  ];

  return (
    <footer className="bg-background text-foreground py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-primary">CRAVO</h2>
          <p className="text-muted-foreground mt-3">
            Serving the finest dishes with love. Visit us for an unforgettable
            dining experience.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-muted-foreground">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow & Contact</h3>
          <div className="flex items-center gap-4 mb-4">
            <Facebook className="cursor-pointer hover:text-primary transition-colors duration-200" />
            <Instagram className="cursor-pointer hover:text-primary transition-colors duration-200" />
            <Twitter className="cursor-pointer hover:text-primary transition-colors duration-200" />
            <Youtube className="cursor-pointer hover:text-primary transition-colors duration-200" />
          </div>
          <p className="text-muted-foreground">
            Email: info@deliciousbites.com
          </p>
          <p className="text-muted-foreground">Phone: +880 123 456 789</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border mt-10 pt-6 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} CRAVA. All Rights Reserved.
      </div>
    </footer>
  );
};

export default PublicFooter;
