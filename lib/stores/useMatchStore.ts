import { create } from 'zustand';
import { MatchQueueItem } from '@/types/matching';
import { Patient, Gender, BloodGroup, MasterPatient } from '@/types/patient';

export interface ActivityLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'MATCH_CONFIRMED' | 'MATCH_DISMISSED' | 'SYSTEM';
}

interface MatchStoreState {
  queueItems: MatchQueueItem[];
  masterPatients: Patient[]; // Simplified frontend patient model
  activityLogs: ActivityLog[];
  loading: boolean;
  
  // Actions
  fetchQueue: () => Promise<void>;
  fetchPatients: () => Promise<void>;
  confirmMatch: (queueId: string) => Promise<void>;
  dismissMatch: (queueId: string) => Promise<void>;
  getRecentActivity: () => ActivityLog[];
}

// Helper to map backend MasterPatient to frontend Patient type
function mapMasterPatient(mp: MasterPatient): Patient {
  return {
    id: mp.id,
    fullName: `${mp.firstName} ${mp.lastName}`,
    dob: mp.dateOfBirth,
    gender: mp.gender,
    bloodGroup: BloodGroup.O_POS,
    county: mp.county || 'Unknown',
    isIprsVerified: !!mp.nationalId,
    nationalId: mp.nationalId || '',
    initials: mp.firstName.substring(0, 1) + mp.lastName.substring(0, 1),
    contributingFacilities: mp.links ? Array.from(new Set(mp.links.map(l => l.facilityId))) : []
  }
}

export const useMatchStore = create<MatchStoreState>((set, get) => ({
  queueItems: [],
  masterPatients: [],
  activityLogs: [
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      message: 'System completed automated daily master patient index synchronization.',
      type: 'SYSTEM'
    }
  ],
  loading: false,

  fetchQueue: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/match-queue');
      const data = await res.json();
      set({ queueItems: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch match queue", error);
      set({ loading: false });
    }
  },

  fetchPatients: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/mpi');
      const data: MasterPatient[] = await res.json();
      set({ masterPatients: data.map(mapMasterPatient), loading: false });
    } catch (error) {
      console.error("Failed to fetch patients", error);
      set({ loading: false });
    }
  },
  
  confirmMatch: async (queueId: string) => {
    const { activityLogs } = get();
    
    try {
      const res = await fetch(`/api/match-queue/${queueId}/confirm`, { method: 'POST' });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      const newLog: ActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        message: `Manual match confirmed successfully via Identity Engine.`,
        type: 'MATCH_CONFIRMED'
      };

      set({
        activityLogs: [newLog, ...activityLogs]
      });

      // Refetch both to sync state
      await get().fetchQueue();
      await get().fetchPatients();

    } catch (error) {
      console.error("Confirmation error:", error);
    }
  },

  dismissMatch: async (queueId: string) => {
    // For this prototype, 'dismiss' acts locally to hide the item, 
    // real implementation would hit a POST /api/match-queue/[queueId]/reject
    const { queueItems, activityLogs } = get();
    
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      message: `Match rejected: candidate pair ${queueId} dismissed.`,
      type: 'MATCH_DISMISSED'
    };

    set({
      queueItems: queueItems.filter(item => item.id !== queueId),
      activityLogs: [newLog, ...activityLogs]
    });
  },

  getRecentActivity: () => {
    return get().activityLogs;
  }
}));
