'use client';

import * as React from 'react';
import Link from 'next/link';
import { NavUser } from '@/components/nav-user';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { Home, PlusCircle, ListOrdered, Users, LogOut } from 'lucide-react';

// Sample Data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

// Sidebar Navigation Items
const navItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: Home,
  },
  {
    title: 'Add Menu',
    href: '/admin/dashboard/add-menu',
    icon: PlusCircle,
  },
  {
    title: 'All Menu',
    href: '/admin/dashboard/menus',
    icon: ListOrdered,
  },
  {
    title: 'Users',
    href: '/admin/dashboard/users',
    icon: Users,
  },
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
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
        <NavUser user={data.user} />

        <button className="flex items-center gap-3 p-2 mt-2 rounded-md hover:bg-red-100 text-sm text-red-600 w-full">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
