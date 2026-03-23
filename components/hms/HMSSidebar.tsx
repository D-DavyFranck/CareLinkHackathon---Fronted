'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  DashboardIcon, 
  PersonIcon, 
  PlusIcon, 
  FileTextIcon,
  ExitIcon,
  GearIcon,
  HomeIcon
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'HMS Dashboard', icon: DashboardIcon, href: '/hms' },
  { label: 'Patient Registration', icon: PlusIcon, href: '/hms/registration' },
  { label: 'Electronic Records', icon: FileTextIcon, href: '/hms/patients' },
];

export function HMSSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-emerald-900 text-white flex flex-col h-full border-r border-emerald-800/50">
      <div className="p-6 flex items-center gap-3 border-b border-emerald-800/50">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <HomeIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none">KNH Portal</h1>
          <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mt-1">Hospital Management</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4">Main Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                  : "text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-white" : "text-emerald-300/50 group-hover:text-emerald-300"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-emerald-800/50 space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white transition-all group"
        >
          <ExitIcon className="w-5 h-5 text-emerald-300/50 group-hover:text-emerald-300" />
          <span className="font-medium text-sm">Switch to MPI</span>
        </Link>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100/30">
          <GearIcon className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </div>
      </div>
    </div>
  );
}
