export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export enum BloodGroup {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = 'O+',
  O_NEG = 'O-'
}

export interface Patient {
  id: string; // MPI ID
  fullName: string;
  dob: string;
  gender: Gender | string;
  bloodGroup: BloodGroup;
  county: string;
  isIprsVerified: boolean;
  nationalId?: string;
  initials: string;
  contributingFacilities: string[]; // Facility IDs
}

// BACKEND MODELS
export interface MasterPatient {
  id: string;
  nationalId?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone?: string;
  county?: string;
  createdAt: string;
  updatedAt: string;
  links?: Array<{ facilityId: string; sourceId: string; confidence: number; linkedAt: string }>;
}

export interface SourcePatientRecord {
  id: string;
  facilityId: string;
  mrn: string;
  patient: {
    firstName: string;
    lastName: string;
    nationalId?: string;
    dateOfBirth: string;
    gender: string;
    phone?: string;
    county?: string;
  };
  createdAt: string;
}
