import { SyncJob, SyncMetrics } from '@/types/sync';

export const mockSyncJobs: SyncJob[] = [
  {
    id: "sync-001",
    facilityId: "fac-001",
    facilityName: "Kenyatta National Hospital",
    startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    status: "IN_PROGRESS",
    recordsPulled: 1542,
    newPatients: 120,
    matchedPatients: 1300,
    reviewQueueAdditions: 122,
    errors: [],
    progress: 45,
  },
  {
    id: "sync-002",
    facilityId: "fac-002",
    facilityName: "Nairobi West Hospital",
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    endTime: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    duration: "1h 5m",
    status: "COMPLETED",
    recordsPulled: 847,
    newPatients: 42,
    matchedPatients: 790,
    reviewQueueAdditions: 15,
    errors: [],
    logsUrl: "/logs/sync-002.json"
  },
  {
    id: "sync-003",
    facilityId: "fac-003",
    facilityName: "Aga Khan University Hospital",
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 4.5).toISOString(),
    duration: "30m",
    status: "PARTIAL",
    recordsPulled: 1200,
    newPatients: 105,
    matchedPatients: 1000,
    reviewQueueAdditions: 50,
    errors: [
      {
        id: "err-001",
        code: "FORMAT_ERROR",
        message: "Invalid date format in field dob",
        recordId: "AKUH-2024-9912",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.8).toISOString()
      },
      {
        id: "err-002",
        code: "MISSING_REQUIRED_FIELD",
        message: "Missing primary identifier",
        recordId: "AKUH-2024-9915",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.7).toISOString()
      }
    ],
    logsUrl: "/logs/sync-003.json"
  },
  {
    id: "sync-004",
    facilityId: "fac-006",
    facilityName: "Coast General Hospital",
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 11.8).toISOString(),
    duration: "12m",
    status: "FAILED",
    recordsPulled: 0,
    newPatients: 0,
    matchedPatients: 0,
    reviewQueueAdditions: 0,
    errors: [
        {
            id: "err-003",
            code: "CONNECTION_TIMEOUT",
            message: "Failed to connect to source database API after 3 retries",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 11.9).toISOString()
        }
    ],
    logsUrl: "/logs/sync-004.json"
  },
  {
    id: "sync-005",
    facilityId: "fac-005",
    facilityName: "Kenyatta University TRH",
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 23.5).toISOString(),
    duration: "30m",
    status: "COMPLETED",
    recordsPulled: 5430,
    newPatients: 300,
    matchedPatients: 5000,
    reviewQueueAdditions: 130,
    errors: [],
    logsUrl: "/logs/sync-005.json"
  }
];

export const mockSyncMetrics: SyncMetrics = {
  totalSyncsToday: 12,
  successRate7Days: 92.4, // 92.4%
  avgRecordsPerSync: 1245,
  facilitiesWithErrors: [
    { facilityName: "Coast General Hospital", errorCount: 3 },
    { facilityName: "Aga Khan University Hospital", errorCount: 1 }
  ]
};
