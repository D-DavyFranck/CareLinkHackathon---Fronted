import { MasterPatient, SourcePatientRecord } from '@/types/patient';
import { MatchQueueItem, SourceRecord } from '@/types/matching';
import { Encounter } from '@/types/encounter';
import { mockEncounters } from '@/lib/mock-data/encounters';

export const dbClasses = {
  masterPatients: [] as MasterPatient[],
  sourceRecords: [] as SourcePatientRecord[],
  matchQueue: [] as MatchQueueItem[],
  encounters: [] as Encounter[],
};

// Helper mapper to frontend SourceRecord
export function toFrontendSourceRecord(src: SourcePatientRecord): SourceRecord {
   return {
      name: `${src.patient.firstName} ${src.patient.lastName}`,
      dob: src.patient.dateOfBirth,
      age: new Date().getFullYear() - parseInt(src.patient.dateOfBirth.split('-')[0] || '1990'),
      gender: src.patient.gender,
      nationalId: src.patient.nationalId,
      phone: src.patient.phone || 'N/A',
      address: {
         county: src.patient.county || 'Nairobi',
         subCounty: 'Unknown'
      },
      mrn: src.mrn,
      facilityId: src.facilityId,
      facilityName: src.facilityId,
      visits: []
   }
}

export function toFrontendSourceRecordFromMaster(mpi: MasterPatient): SourceRecord {
   return {
      name: `${mpi.firstName} ${mpi.lastName}`,
      dob: mpi.dateOfBirth,
      age: new Date().getFullYear() - parseInt(mpi.dateOfBirth.split('-')[0] || '1990'),
      gender: mpi.gender,
      nationalId: mpi.nationalId,
      phone: mpi.phone || 'N/A',
      address: {
         county: mpi.county || 'Nairobi',
         subCounty: 'Unknown'
      },
      mrn: mpi.id,
      facilityId: 'MPI',
      facilityName: 'Master Patient Index',
      visits: []
   }
}

export function seedDatabase() {
  if (dbClasses.encounters.length === 0) {
     dbClasses.encounters = [...mockEncounters];
  }

  if (dbClasses.masterPatients.length === 0) {
    dbClasses.masterPatients.push({
      id: 'MPI-000124',
      nationalId: '29384756',
      firstName: 'Sarah',
      lastName: 'Otieno',
      dateOfBirth: '1985-04-12',
      gender: 'Female',
      phone: '+254712345678',
      county: 'Nairobi',
      createdAt: '2025-01-10T08:00:00Z',
      updatedAt: '2026-03-12T10:30:00Z',
      links: [
        { facilityId: 'KNH', sourceId: 'fac_1_rec_1', confidence: 1.0, linkedAt: '2025-01-10T08:00:00Z' }
      ]
    });
  }

  if (dbClasses.matchQueue.length === 0) {
    dbClasses.matchQueue.push({
      id: 'mq_1001',
      confidence: 0.92,
      recordA: {
        name: 'Sarah Otieno',
        dob: '1985-04-12',
        age: 41,
        gender: 'Female',
        nationalId: '29384756',
        phone: '+254712345678',
        address: { county: 'Kiambu', subCounty: 'Thika' },
        mrn: 'KNH-891',
        facilityId: 'KNH',
        facilityName: 'Kenyatta National Hospital',
        visits: []
      },
      recordB: {
        name: 'S. Otieno',
        dob: '1985-04-12',
        age: 41,
        gender: 'Female',
        nationalId: '29384756',
        phone: '0712345678',
        address: { county: 'Nairobi', subCounty: 'Westlands' },
        mrn: 'MPI-000124', // Target Master Patient
        facilityId: 'MPI',
        facilityName: 'Master Patient Index',
        visits: []
      },
      signals: {
        name: 0.85,
        dob: 1.0,
        phone: 0.95,
        gender: 1.0,
        nid: 1.0,
        county: 0.4
      },
      suggestions: [
        'Deterministic match on National ID',
        'Fuzzy match on Name (S. Otieno vs Sarah Otieno)',
        'Phone formats vary but match after normalization'
      ],
      timeWaiting: '12 mins ago',
      status: 'PENDING'
    });
  }
}

seedDatabase();

export const Database = {
  getMasterPatients: () => dbClasses.masterPatients,
  getSourceRecords: () => dbClasses.sourceRecords,
  getMatchQueue: () => dbClasses.matchQueue,
  
  getEncounters: (patientId?: string) => {
    if (patientId) {
       return dbClasses.encounters.filter(e => e.patientId === patientId);
    }
    return dbClasses.encounters;
  },

  addMasterPatient: (patient: MasterPatient) => {
    dbClasses.masterPatients.push(patient);
    return patient;
  },
  
  updateMasterPatient: (id: string, updates: Partial<MasterPatient>) => {
    const idx = dbClasses.masterPatients.findIndex(p => p.id === id);
    if (idx !== -1) {
      dbClasses.masterPatients[idx] = { ...dbClasses.masterPatients[idx], ...updates };
      return dbClasses.masterPatients[idx];
    }
    return null;
  },

  addSourceRecord: (record: SourcePatientRecord) => {
    dbClasses.sourceRecords.push(record);
    return record;
  },

  addMatchQueueItem: (item: MatchQueueItem) => {
    dbClasses.matchQueue.push(item);
    return item;
  },

  resolveMatchQueueItem: (id: string, status: 'MANUAL_MATCHED' | 'REJECTED') => {
    const idx = dbClasses.matchQueue.findIndex(q => q.id === id);
    if (idx !== -1) {
       dbClasses.matchQueue[idx].status = status;
       return dbClasses.matchQueue[idx];
    }
    return null;
  },

  reassignEncounters: (sourceMrn: string, targetMpiId: string) => {
    // When records are merged, source encounters migrate to point to targeted Master Patient ID
    dbClasses.encounters = dbClasses.encounters.map(e => {
       if (e.patientId === sourceMrn) {
          return { ...e, patientId: targetMpiId };
       }
       return e;
    });
  }
};
