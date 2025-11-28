'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#', label: 'Consultation' },
  { href: '#', label: 'Health Plans' },
  { href: '#', label: 'Medicine' },
  { href: '#', label: 'Diagnostics' },
  { href: '#', label: 'NGOs' },
];

const PublicNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CRAVA
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navItems.map(item => (
            <li key={item.label}>
              <Link href={item.href} className="hover:text-blue-600 transition">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-white shadow-md flex flex-col gap-4 px-6 py-4 text-gray-700 font-medium">
          {navItems.map(item => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block hover:text-blue-600"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default PublicNavbar;
