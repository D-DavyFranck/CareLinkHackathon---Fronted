export enum EncounterType {
  EMERGENCY = 'Emergency',
  INPATIENT = 'Inpatient',
  OUTPATIENT = 'Outpatient',
  CARDIOLOGY = 'Cardiology',
  SURGERY = 'Surgery'
}

export interface Diagnosis {
  code: string;
  description: string;
  type: 'PRIMARY' | 'SECONDARY' | 'COMORBIDITY';
  status: 'ACTIVE' | 'RESOLVED' | 'CHRONIC';
}

export interface LabResult {
  testName: string;
  value: string;
  status: 'NORMAL' | 'ABNORMAL' | 'CRITICAL';
  referenceRange: string;
  date: string;
}

export interface Medication {
  name: string;
  strength: string;
  dosage: string;
  status: 'ACTIVE' | 'COMPLETED' | 'STOPPED';
  facilityId: string;
  prescribedDate: string;
  hasInteractionFlag?: boolean;
}

export interface Encounter {
  id: string;
  patientId: string;
  facilityId: string;
  type: EncounterType;
  date: string;
  department: string;
  attendingDoctor: string;
  chiefComplaint: string;
  diagnoses: Diagnosis[];
  labs: LabResult[];
  medications: Medication[];
}
