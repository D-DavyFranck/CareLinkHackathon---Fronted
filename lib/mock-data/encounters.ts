import { Encounter, EncounterType } from '@/types/encounter';

export const mockEncounters: Encounter[] = [
  {
    id: 'ENC-001',
    patientId: 'MPI-000124',
    facilityId: 'knh',
    type: EncounterType.OUTPATIENT,
    date: '2024-11-18',
    department: 'General Outpatient',
    attendingDoctor: 'Dr. James Mwangi',
    chiefComplaint: 'Persistent cough and difficulty breathing for 3 days',
    diagnoses: [
      { code: 'J06.9', description: 'Acute upper respiratory infection, unspecified', type: 'PRIMARY', status: 'ACTIVE' }
    ],
    labs: [
      { testName: 'CBC', value: '12.5', status: 'NORMAL', referenceRange: '11.0-16.0', date: '2024-11-18' },
      { testName: 'Chest X-ray', value: 'Mild congestion noted', status: 'ABNORMAL', referenceRange: 'Clear', date: '2024-11-18' }
    ],
    medications: [
      { name: 'Amoxicillin', strength: '500mg', dosage: '1 tablet • Twice daily • Oral • 7 days', status: 'ACTIVE', facilityId: 'knh', prescribedDate: '2024-11-18' }
    ]
  },
  {
    id: 'ENC-002',
    patientId: 'MPI-000124',
    facilityId: 'nairobi-west',
    type: EncounterType.EMERGENCY,
    date: '2024-10-05',
    department: 'Emergency Medicine',
    attendingDoctor: 'Dr. Alice Waweru',
    chiefComplaint: 'High fever and joint pain',
    diagnoses: [
      { code: 'B54', description: 'Unspecified malaria', type: 'PRIMARY', status: 'RESOLVED' }
    ],
    labs: [
      { testName: 'Malaria RDT', value: 'Positive', status: 'CRITICAL', referenceRange: 'Negative', date: '2024-10-05' }
    ],
    medications: [
      { name: 'Artemether-lumefantrine', strength: '20/120mg', dosage: '4 tablets • Twice daily • Oral • 3 days', status: 'COMPLETED', facilityId: 'nairobi-west', prescribedDate: '2024-10-05' }
    ]
  },
  {
    id: 'ENC-003',
    patientId: 'MPI-000124',
    facilityId: 'aga-khan',
    type: EncounterType.INPATIENT,
    date: '2024-12-02',
    department: 'Internal Medicine',
    attendingDoctor: 'Dr. Robert Mutua',
    chiefComplaint: 'Routine follow-up for hypertension',
    diagnoses: [
      { code: 'I10', description: 'Essential (primary) hypertension', type: 'PRIMARY', status: 'CHRONIC' }
    ],
    labs: [
      { testName: 'Blood Glucose', value: '5.4', status: 'NORMAL', referenceRange: '3.9-6.1', date: '2024-12-02' }
    ],
    medications: [
      { name: 'Amlodipine', strength: '5mg', dosage: '1 tablet • Once daily • Oral • Ongoing', status: 'ACTIVE', facilityId: 'aga-khan', prescribedDate: '2024-12-02' }
    ]
  }
];
