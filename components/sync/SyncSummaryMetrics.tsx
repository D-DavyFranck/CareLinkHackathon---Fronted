import React from 'react';
import { SyncMetrics } from '@/types/sync';
import { 
  ActivityLogIcon, 
  CheckCircledIcon, 
  LayersIcon, 
  ExclamationTriangleIcon 
} from '@radix-ui/react-icons';

interface SyncSummaryMetricsProps {
  metrics: SyncMetrics;
}

export function SyncSummaryMetrics({ metrics }: SyncSummaryMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Syncs Desktop */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <ActivityLogIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Syncs Today</p>
            <h3 className="text-2xl font-bold text-foreground">{metrics.totalSyncsToday}</h3>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Active jobs across facilities</p>
      </div>

      {/* Success Rate */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <CheckCircledIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
            <h3 className="text-2xl font-bold text-foreground">{metrics.successRate7Days}%</h3>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Rolling 7-day average</p>
      </div>

      {/* Average Records */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[#1A73B8]/10 flex items-center justify-center">
            <LayersIcon className="w-5 h-5 text-[#1A73B8]" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg Records/Sync</p>
            <h3 className="text-2xl font-bold text-foreground">{metrics.avgRecordsPerSync.toLocaleString()}</h3>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Historical volume standard</p>
      </div>

      {/* Facilities with Errors */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Facilities w/ Errors</p>
            <h3 className="text-2xl font-bold text-foreground">{metrics.facilitiesWithErrors.length}</h3>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground flex items-center justify-between">
           <div className="truncate max-w-[150px]">
               {metrics.facilitiesWithErrors.length > 0 
                ? metrics.facilitiesWithErrors.map(f => f.facilityName).join(', ')
                : 'All systems green'}
           </div>
           
        </div>
      </div>
    </div>
  );
}
