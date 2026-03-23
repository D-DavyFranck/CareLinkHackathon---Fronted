'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  PersonIcon, 
  MixerHorizontalIcon, 
  UpdateIcon, 
  LockClosedIcon, 
  GearIcon 
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

const sidebarNavItems = [
  {
    title: "User Management",
    href: "/settings/users",
    icon: <PersonIcon className="w-5 h-5" />,
  },
  {
    title: "Matching Engine",
    href: "/settings/matching",
    icon: <MixerHorizontalIcon className="w-5 h-5" />,
  },
  {
    title: "Integration & Sync",
    href: "/settings/integration",
    icon: <UpdateIcon className="w-5 h-5" />,
  },
  {
    title: "Security & Audit",
    href: "/settings/security",
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
  {
    title: "Preferences",
    href: "/settings/preferences",
    icon: <GearIcon className="w-5 h-5" />,
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-2">
         <h1 className="text-3xl font-bold text-foreground tracking-tight">System Settings</h1>
         <p className="text-muted-foreground">Manage users, matching algorithms, integrations, and global security policies.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mt-4">
        {/* Settings Sidebar */}
        <aside className="md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {sidebarNavItems.map((item) => {
              // Active state
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className={cn(
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>{item.icon}</span>
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-card border border-border shadow-sm rounded-2xl min-h-[500px]">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
