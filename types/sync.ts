export type SyncStatus = 'COMPLETED' | 'PARTIAL' | 'FAILED' | 'IN_PROGRESS' | 'DELAYED';

export interface SyncJob {
  id: string;
  facilityId: string;
  facilityName: string;
  startTime: string;
  endTime?: string;
  duration?: string;
  status: SyncStatus;
  recordsPulled: number;
  newPatients: number;
  matchedPatients: number;
  reviewQueueAdditions: number;
  errors: SyncError[];
  logsUrl?: string; // Link to detailed JSON logs
  progress?: number; // 0-100 for IN_PROGRESS
}

export interface SyncError {
  id: string;
  code: string;
  message: string;
  recordId?: string;
  timestamp: string;
}

export interface SyncMetrics {
  totalSyncsToday: number;
  successRate7Days: number; // percentage
  avgRecordsPerSync: number;
  facilitiesWithErrors: {
    facilityName: string;
    errorCount: number;
  }[];
}
