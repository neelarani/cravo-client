'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { authApi } from '@/redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { href: 'features-menu', label: 'Menu' },
  { href: '#contact', label: 'Contact' },
  { href: 'about-us', label: 'About us' },
];

const PublicNavbar = () => {
  const [open, setOpen] = useState(false); // Mobile menu toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // User dropdown toggle
  const router = useRouter();

  const { data: user } = authApi.useGetMeQuery();
  console.log(user);
  const [logout] = authApi.useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success('You have been signed out successfully');
      router.push('/login');
    } catch {
      toast.error('Failed to logout!');
    }
  };

  return (
    <nav className="w-full bg-background shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          CRAVO
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-foreground font-medium">
          {navItems.map(item => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Conditional User Section */}
          {user ? (
            <li className="relative">
              {/* User Avatar */}
              <Image
                src={
                  user.data?.avatar_url ||
                  'https://res.cloudinary.com/ddonxd2yp/image/upload/v1765097100/free-vector-user-icon_901408-589_vvlbe0.avif'
                }
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50 text-sm md:text-base space-y-2">
                  <p className="px-4 py-2 text-gray-700">
                    Email: {user.data?.email}
                  </p>

                  {/* Role-based Dashboard Link */}
                  {user.data?.role === 'ADMIN' ? (
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : user.data?.role === 'USER' ? (
                    <Link
                      href="/user/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : null}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="border-border border-2 text-accent-foreground px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Join
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Toggle Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-background shadow-md flex flex-col gap-4 px-6 py-4 text-foreground font-medium">
          {navItems.map(item => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Conditional Buttons */}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-destructive text-white px-4 py-2 rounded-lg hover:opacity-90 cursor-pointer"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-accent px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Join
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default PublicNavbar;
