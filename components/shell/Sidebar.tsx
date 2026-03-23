'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  DashboardIcon, 
  PersonIcon, 
  ShuffleIcon, 
  BackpackIcon, 
  ActivityLogIcon, 
  BarChartIcon,
  ExitIcon,
  GearIcon,
  QuestionMarkCircledIcon,
  MagnifyingGlassIcon,
  ComponentInstanceIcon,
  HomeIcon
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: DashboardIcon, label: 'Dashboard', href: '/dashboard' },
  { icon: PersonIcon, label: 'Patients', href: '/patients' },
  { icon: ShuffleIcon, label: 'Match Queue', href: '/match-queue' },
  { icon: BackpackIcon, label: 'Facilities', href: '/facilities' },
  { icon: ActivityLogIcon, label: 'Sync Monitor', href: '/sync' },
  { icon: BarChartIcon, label: 'Analytics', href: '/analytics' },
];

const bottomItems = [
  { icon: GearIcon, label: 'Settings', href: '/settings' },
  { icon: QuestionMarkCircledIcon, label: 'Get Help', href: '/help' },
  { icon: MagnifyingGlassIcon, label: 'Search', href: '/search' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-background border-r border-border h-screen fixed left-0 top-0 flex flex-col z-50">
      {/* Logo Area */}
      <div className="p-6">
        <div className="flex items-center gap-3 p-2 border border-border rounded-lg bg-card/50">
          <div className="w-6 h-6 rounded-full border-2 border-foreground/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-foreground" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground">UniHealth MPI</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="mb-4">
          <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Systems</p>
          <nav className="space-y-1">
            <Link 
              href="/hms" 
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-all group"
            >
              <HomeIcon className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-bold">KNH Hospital Portal</span>
            </Link>
          </nav>
        </div>

        <div className="mb-4">
          <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Home</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-secondary text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className={cn(
                    "w-4 h-4",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mb-4">
          <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Documents</p>
          <nav className="space-y-1">
            <Link href="/data-library" className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50">
              <ComponentInstanceIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Data Library</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border">
        <nav className="space-y-1 mb-4">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              FK
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">Frank Davy</span>
              <span className="text-[10px] text-muted-foreground">Admin</span>
            </div>
          </div>
          <ExitIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
        </div>
      </div>
    </aside>
  );
}
