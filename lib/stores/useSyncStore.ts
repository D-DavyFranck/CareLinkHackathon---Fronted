import { create } from 'zustand';
import { SyncJob, SyncMetrics } from '@/types/sync';
import { mockSyncJobs, mockSyncMetrics } from '../mock-data/sync';

interface SyncStore {
  jobs: SyncJob[];
  metrics: SyncMetrics;
  
  // Actions
  cancelSync: (jobId: string) => void;
  retrySync: (jobId: string) => void;
  triggerSync: (facilityId: string, facilityName: string) => void;
  deleteSync: (jobId: string) => void;
}

export const useSyncStore = create<SyncStore>((set, get) => ({
  jobs: mockSyncJobs,
  metrics: mockSyncMetrics,

  cancelSync: (jobId: string) => {
    set((state) => ({
      jobs: state.jobs.map((job) => 
        job.id === jobId && job.status === 'IN_PROGRESS'
          ? { ...job, status: 'FAILED', errors: [{ id: `err-${Date.now()}`, code: 'USER_CANCELLED', message: 'Sync cancelled by user', timestamp: new Date().toISOString() }], endTime: new Date().toISOString(), duration: 'Cancelled' }
          : job
      )
    }));
  },

  retrySync: (jobId: string) => {
      set((state) => {
          const jobToRetry = state.jobs.find(j => j.id === jobId);
          if (!jobToRetry) return state;

          const newJob: SyncJob = {
              ...jobToRetry,
              id: `sync-retry-${Date.now()}`,
              status: 'IN_PROGRESS',
              startTime: new Date().toISOString(),
              endTime: undefined,
              duration: undefined,
              errors: [],
              progress: 0,
              recordsPulled: 0,
              newPatients: 0,
              matchedPatients: 0,
              reviewQueueAdditions: 0,
          };

          return { jobs: [newJob, ...state.jobs] };
      });
  },

  triggerSync: (facilityId: string, facilityName: string) => {
      set((state) => {
          const newJob: SyncJob = {
              id: `sync-${Date.now()}`,
              facilityId,
              facilityName,
              startTime: new Date().toISOString(),
              status: 'IN_PROGRESS',
              progress: 0,
              recordsPulled: 0,
              newPatients: 0,
              matchedPatients: 0,
              reviewQueueAdditions: 0,
              errors: []
          };
          return { jobs: [newJob, ...state.jobs] };
      });
  },

  deleteSync: (jobId: string) => {
      set((state) => ({
          jobs: state.jobs.filter(j => j.id !== jobId)
      }));
  }
}));
