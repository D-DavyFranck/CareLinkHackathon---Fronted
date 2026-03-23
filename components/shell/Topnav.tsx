'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { 
  BellIcon, 
  MagnifyingGlassIcon,
  PlusIcon
} from '@radix-ui/react-icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { GlobalSearch } from '@/components/search/GlobalSearch';

export function Topnav() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.startsWith('/hms/registration')) return 'Patient Registration';
    if (pathname.startsWith('/hms/patients')) return 'Electronic Health Records';
    if (pathname.startsWith('/hms')) return 'Hospital Dashboard';
    if (pathname.startsWith('/dashboard')) return 'Dashboard Overview';
    if (pathname.startsWith('/patients')) return 'Patient 360° Profile';
    if (pathname.startsWith('/match-queue')) return 'Match Review Queue';
    return 'UniHealth MPI';
  };

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground tracking-tight">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        <GlobalSearch />

        <button className="flex items-center gap-2 px-3 py-1.5 bg-foreground text-background rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">
          <PlusIcon className="w-4 h-4" />
          <span>Quick Create</span>
        </button>

        <div className="h-4 w-[1px] bg-border mx-2" />

        <ThemeToggle />

        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
        </button>
      </div>
    </header>
  );
}
