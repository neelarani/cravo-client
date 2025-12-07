'use client';

import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Home, PlusCircle, ListOrdered, Users, LogOut } from 'lucide-react';
import { authApi } from '@/redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function AppSidebar() {
  const router = useRouter();
  const { data: user, isLoading } = authApi.useGetMeQuery();
  const [logout] = authApi.useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success('Successfully logged out');
      router.push('/login');
    } catch {
      toast.error('Failed to logout!');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user?.data) return null;

  const navItems =
    user.data.role === 'ADMIN'
      ? [
          { title: 'Dashboard', href: '/admin/dashboard', icon: Home },
          {
            title: 'My Profile',
            href: '/my-profile',
            icon: Users,
          },
          {
            title: 'Add Menu',
            href: '/admin/dashboard/add-menu',
            icon: PlusCircle,
          },

          { title: 'Users', href: '/admin/dashboard/users', icon: Users },
          { title: 'Home', href: '/', icon: Home },
        ]
      : [
          { title: 'Dashboard', href: '/user/dashboard', icon: Home },
          { title: 'Profile', href: '/my-profile', icon: Users },

          {
            title: 'My Orders',
            href: '/user/dashboard/my-orders',
            icon: ListOrdered,
          },
          { title: 'Home', href: '/', icon: Home },
        ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />

      {/* SIDEBAR CONTENT */}
      <SidebarContent>
        <div className="p-2 flex flex-col gap-1">
          {navItems.map(item => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-accent text-sm"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 mt-2 rounded-md hover:bg-red-100 text-sm text-red-600 w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
