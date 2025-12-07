'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { authApi } from '@/redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const DashboardNavbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: user } = authApi.useGetMeQuery();
  const [logout] = authApi.useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success('Logged out');
      router.push('/login');
    } catch {
      toast.error('Failed to logout');
    }
  };

  if (!user?.data) return null;

  return (
    <nav className="w-full bg-gray-100 shadow-md fixed top-0 left-0 z-50 flex justify-between items-center px-4 py-3">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-gray-800">
        CRAVO
      </Link>

      {/* User Avatar + Dropdown */}
      <div className="relative">
        <Image
          src={user.data.avatar_url || '/avatars/default.jpg'}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
            <p className="px-4 py-1 text-sm text-gray-700">
              {user.data?.full_name}
            </p>
            <Link
              href={
                user.data.role === 'ADMIN'
                  ? '/admin/dashboard'
                  : '/user/dashboard'
              }
              className="block px-4 py-1 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-1 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
