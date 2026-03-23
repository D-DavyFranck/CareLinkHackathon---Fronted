'use client';

import React, { useState } from 'react';
import { useSyncStore } from '@/lib/stores/useSyncStore';
import { SyncSummaryMetrics } from '@/components/sync/SyncSummaryMetrics';
import { LiveSyncFeed } from '@/components/sync/LiveSyncFeed';
import { SyncHistoryTable } from '@/components/sync/SyncHistoryTable';
import { SyncAlerts } from '@/components/sync/SyncAlerts';
import { ActivityLogIcon, ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

export default function SyncMonitorPage() {
  const { jobs, metrics, triggerSync } = useSyncStore();
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const activeJobs = jobs.filter(j => j.status === 'IN_PROGRESS');
  const alertJobs = jobs.filter(j => !dismissedAlerts.has(j.id));

  const handleManualSync = () => {
      triggerSync(`fac-manual-${Date.now()}`, "Manual System Check");
      toast.success("Triggered manual sync job");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary">
            <ActivityLogIcon className="w-5 h-5" />
            <h1 className="text-2xl font-bold tracking-tight">Sync Monitor</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Real‑time and historical visibility into data assimilation across all facilities.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={handleManualSync}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
                <ReloadIcon className="w-4 h-4" />
                Trigger Global Sync
            </button>
        </div>
      </div>

      <SyncAlerts 
        jobs={alertJobs} 
        onDismiss={(id) => setDismissedAlerts(prev => new Set([...prev, id]))} 
      />

      <SyncSummaryMetrics metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Live Feed */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
             <h2 className="text-lg font-semibold text-foreground">Live Sync Feed</h2>
             <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {activeJobs.length} Active
             </span>
          </div>
          <LiveSyncFeed activeJobs={activeJobs} />
        </div>

        {/* Right Column - History */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
             <h2 className="text-lg font-semibold text-foreground">Sync History</h2>
             <span className="text-xs text-muted-foreground">Last 30 Days</span>
          </div>
          <SyncHistoryTable jobs={jobs} />
        </div>

      </div>
    </div>
  );
}
