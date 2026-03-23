import React from 'react';
import { SyncJob } from '@/types/sync';
import { ExclamationTriangleIcon, Cross2Icon } from '@radix-ui/react-icons';

interface SyncAlertsProps {
  jobs: SyncJob[];
  onDismiss: (jobId: string) => void;
}

export function SyncAlerts({ jobs, onDismiss }: SyncAlertsProps) {
  // Find very recent failures (e.g., within last 24 hours)
  const recentFailures = jobs.filter(j => 
      j.status === 'FAILED' && 
      (new Date().getTime() - new Date(j.startTime).getTime()) < 1000 * 60 * 60 * 24
  );

  if (recentFailures.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      {recentFailures.slice(0, 3).map((job) => (
        <div key={`alert-${job.id}`} className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-start gap-3">
          <div className="mt-0.5">
             <ExclamationTriangleIcon className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1">
             <h4 className="text-sm font-semibold text-destructive">Sync Failure: {job.facilityName}</h4>
             <p className="text-xs text-destructive/80 mt-1">
                 The automated sync job at {new Date(job.startTime).toLocaleTimeString()} failed. 
                 {job.errors.length > 0 && ` Reason: ${job.errors[0].message}`}
             </p>
          </div>
          <button 
             onClick={() => onDismiss(job.id)}
             className="text-destructive/60 hover:text-destructive p-1 rounded-md hover:bg-destructive/10 transition-colors"
          >
             <Cross2Icon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
