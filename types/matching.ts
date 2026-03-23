export interface VisitHistory {
  date: string;
  department: string;
  diagnosis: string;
}

export interface SourceRecord {
  name: string;
  dob: string;
  age: number;
  gender: string;
  nationalId?: string;
  phone: string;
  address: {
    county: string;
    subCounty: string;
  };
  mrn: string;
  facilityId: string;
  facilityName: string;
  visits: VisitHistory[];
}

export interface MatchQueueItem {
  id: string;
  confidence: number;
  recordA: SourceRecord;
  recordB: SourceRecord;
  signals: {
    name: number;
    dob: number;
    phone: number;
    gender: number;
    nid: number;
    county: number;
  };
  suggestions: string[];
  timeWaiting: string;
  status: 'PENDING' | 'IPRS_PENDING' | 'MANUAL_MATCHED' | 'REJECTED';
}
