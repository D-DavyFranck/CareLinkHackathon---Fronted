'use client';

import React, { useState } from 'react';
import { SyncJob, SyncStatus } from '@/types/sync';
import { 
  CheckCircledIcon, 
  ExclamationTriangleIcon, 
  CrossCircledIcon,
  DotsHorizontalIcon,
  ClockIcon,
  DownloadIcon,
  ReloadIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { useSyncStore } from '@/lib/stores/useSyncStore';
import { toast } from 'sonner';

interface SyncHistoryTableProps {
  jobs: SyncJob[];
}

export function SyncHistoryTable({ jobs }: SyncHistoryTableProps) {
  const [filterFacility, setFilterFacility] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const retrySync = useSyncStore(state => state.retrySync);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const historyJobs = jobs.filter(j => j.status !== 'IN_PROGRESS');

  const filteredJobs = historyJobs.filter(job => {
      const matchFacility = filterFacility === 'all' || job.facilityName === filterFacility;
      const matchStatus = filterStatus === 'all' || job.status === filterStatus;
      return matchFacility && matchStatus;
  });

  const getStatusBadge = (status: SyncStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold w-max leading-none">
            <CheckCircledIcon className="w-3.5 h-3.5" />
            Completed
          </div>
        );
      case 'PARTIAL':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold w-max leading-none">
            <ExclamationTriangleIcon className="w-3.5 h-3.5" />
            Partial
          </div>
        );
      case 'FAILED':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold w-max leading-none">
            <CrossCircledIcon className="w-3.5 h-3.5" />
            Failed
          </div>
        );
      case 'DELAYED':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground text-xs font-semibold w-max leading-none">
            <ClockIcon className="w-3.5 h-3.5" />
            Delayed
          </div>
        );
      default:
        return null;
    }
  };

  const facilities = Array.from(new Set(historyJobs.map(j => j.facilityName)));

  const handleRetry = (jobId: string, facilityName: string) => {
      retrySync(jobId);
      setOpenDropdownId(null);
      toast.success(`Retrying sync for ${facilityName}`);
  };

  const handleDownload = (logsUrl?: string) => {
      setOpenDropdownId(null);
      if (logsUrl) {
          toast.success("Downloading logs format...");
      } else {
          toast.error("No logs available for this job.");
      }
  };

  const handleViewDetails = (jobId: string) => {
      setOpenDropdownId(null);
      toast.info("Opening sync details dialog mock");
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col">
      {/* Filters */}
      <div className="p-4 border-b border-border flex items-center gap-4">
        <select 
            value={filterFacility} 
            onChange={(e) => setFilterFacility(e.target.value)}
            className="text-sm bg-transparent border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
            <option value="all">All Facilities</option>
            {facilities.map(f => (
                <option key={f} value={f}>{f}</option>
            ))}
        </select>

        <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm bg-transparent border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
            <option value="all">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="PARTIAL">Partial</option>
            <option value="FAILED">Failed</option>
        </select>
        
        <div className="ml-auto text-xs text-muted-foreground">
            Showing {filteredJobs.length} records
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Facility</th>
              <th className="px-6 py-4 font-bold">Time Window</th>
              <th className="px-6 py-4 font-bold">Duration</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right pt-2 pb-2">Records Pulled</th>
              <th className="px-6 py-4 font-bold text-center pt-2 pb-2">Results</th>
              <th className="px-6 py-4 font-bold text-center">Errors</th>
              <th className="px-6 py-4 font-bold w-[60px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
                <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                        No sync history found matching criteria.
                    </td>
                </tr>
            ) : filteredJobs.map((job) => (
              <tr key={job.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">{job.facilityName}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-0.5">{job.id}</div>
                </td>
                <td className="px-6 py-4 text-xs text-muted-foreground">
                    <div>{new Date(job.startTime).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short'})}</div>
                    <div>to {job.endTime ? new Date(job.endTime).toLocaleTimeString(undefined, { timeStyle: 'short'}) : '--'}</div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {job.duration || '--'}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(job.status)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-foreground font-medium">
                  {job.recordsPulled.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 justify-center">
                      <div className="flex flex-col items-center bg-emerald-500/10 px-2.5 py-1 rounded w-16" title="New Patients">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground">New</span>
                          <span className="font-mono font-semibold text-emerald-600 text-xs">+{job.newPatients}</span>
                      </div>
                      <div className="flex flex-col items-center bg-primary/10 px-2.5 py-1 rounded w-16" title="Matched Patients">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground">Match</span>
                          <span className="font-mono font-semibold text-primary text-xs">{job.matchedPatients}</span>
                      </div>
                      <div className="flex flex-col items-center bg-amber-500/10 px-2.5 py-1 rounded w-16" title="Review Queue additions">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground">Review</span>
                          <span className="font-mono font-semibold text-amber-500 text-xs">{job.reviewQueueAdditions}</span>
                      </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                    {job.errors.length > 0 ? (
                        <div className="relative group inline-block">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-destructive/10 text-destructive font-mono text-xs font-bold cursor-help">
                                {job.errors.length}
                            </span>
                            {/* Simple tooltip mock */}
                            <div className="absolute hidden group-hover:block z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-foreground text-background text-xs rounded-lg p-3 shadow-lg">
                                <ul className="list-disc pl-4 space-y-1">
                                    {job.errors.slice(0, 3).map(err => (
                                        <li key={err.id}>{err.code}: {err.message}</li>
                                    ))}
                                    {job.errors.length > 3 && <li>...and {job.errors.length - 3} more</li>}
                                </ul>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
                            </div>
                        </div>
                    ) : (
                        <span className="text-muted-foreground/50">—</span>
                    )}
                </td>
                <td className="px-6 py-4 text-right relative dropdown-container">
                  <button 
                    onClick={() => setOpenDropdownId(openDropdownId === job.id ? null : job.id)}
                    className="p-2 hover:bg-muted rounded-md text-muted-foreground transition-colors"
                  >
                    <DotsHorizontalIcon className="w-5 h-5" />
                  </button>
                  
                  {openDropdownId === job.id && (
                    <div className="absolute right-6 top-10 w-48 bg-card border border-border shadow-md rounded-xl py-1 z-50 text-left">
                      <button 
                        onClick={() => handleViewDetails(job.id)}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/50 flex items-center gap-2"
                      >
                        <EyeOpenIcon className="w-4 h-4 text-muted-foreground" />
                        View Details
                      </button>
                      {(job.status === 'FAILED' || job.status === 'PARTIAL') && (
                          <button 
                            onClick={() => handleRetry(job.id, job.facilityName)}
                            className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/50 flex items-center gap-2"
                          >
                            <ReloadIcon className="w-4 h-4 text-primary" />
                            Retry Sync
                          </button>
                      )}
                      {job.logsUrl && (
                          <button 
                            onClick={() => handleDownload(job.logsUrl)}
                            className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/50 flex items-center gap-2"
                          >
                            <DownloadIcon className="w-4 h-4 text-muted-foreground" />
                            Download Log
                          </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
