import React from 'react';
import { SyncJob } from '@/types/sync';
import { ActivityLogIcon, Cross2Icon, UpdateIcon } from '@radix-ui/react-icons';
import { useSyncStore } from '@/lib/stores/useSyncStore';
import { toast } from 'sonner';

interface LiveSyncFeedProps {
  activeJobs: SyncJob[];
}

export function LiveSyncFeed({ activeJobs }: LiveSyncFeedProps) {
  const cancelSync = useSyncStore((state) => state.cancelSync);

  const handleCancel = (jobId: string, facilityName: string) => {
      cancelSync(jobId);
      toast.info(`Cancelled sync job for ${facilityName}`);
  };

  if (activeJobs.length === 0) {
      return (
          <div className="bg-card rounded-xl p-6 border border-border flex flex-col items-center justify-center text-center h-48">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3 text-muted-foreground">
                  <ActivityLogIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-foreground">No Active Syncs</p>
              <p className="text-xs text-muted-foreground max-w-[250px] mt-1">
                  All connection feeds are quiet. Systems are waiting for next scheduled batch or manual trigger.
              </p>
          </div>
      )
  }

  return (
    <div className="space-y-4">
      {activeJobs.map((job) => (
        <div key={job.id} className="bg-card rounded-xl p-5 border border-border shadow-sm transition-all hover:border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UpdateIcon className="w-5 h-5 text-primary animate-spin" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{job.facilityName}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span>Started {new Date(job.startTime).toLocaleTimeString()}</span>
                  <span>•</span>
                  <span>{job.recordsPulled.toLocaleString()} records processed</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => handleCancel(job.id, job.facilityName)}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
            >
              <Cross2Icon className="w-3.5 h-3.5" />
              Cancel Sync
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Overall Progress</span>
              <span className="font-medium text-foreground">{job.progress}%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-1000 ease-in-out rounded-full"
                style={{ width: `${job.progress}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4 bg-secondary/50 rounded-lg p-3">
             <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1">New Patients</span>
                 <span className="text-sm font-semibold text-emerald-600">+{job.newPatients}</span>
             </div>
             <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Matched</span>
                 <span className="text-sm font-semibold text-primary">{job.matchedPatients}</span>
             </div>
             <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Review Queue</span>
                 <span className="text-sm font-semibold text-amber-500">{job.reviewQueueAdditions}</span>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}
