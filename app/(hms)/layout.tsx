'use client';

import React from 'react';
import { HMSSidebar } from '@/components/hms/HMSSidebar';
import { Topnav } from '@/components/shell/Topnav';

export default function HMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <HMSSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topnav />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
