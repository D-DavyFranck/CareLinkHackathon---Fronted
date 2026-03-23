export type FacilityType = 'Public Hospital' | 'Private Clinic' | 'Lab' | 'Faith Based' | 'NGO';
export type ConnectionType = 'FHIR R4' | 'CSV Upload' | 'Manual Entry';
export type AuthType = 'None' | 'Basic Auth' | 'API Key' | 'OAuth2';
export type SyncMode = 'Full' | 'Incremental';
export type FacilityStatus = 'Active' | 'Inactive' | 'Error';

export interface FacilityContact {
  name: string;
  email: string;
  phone: string;
}

export interface FhirSettings {
  baseUrl: string;
  authType: AuthType;
  credentials?: string; // Encrypted
  version: 'R4';
}

export interface CsvSettings {
  uploadEndpoint: string;
  fileNamingConvention: string;
}

export interface FieldMapping {
  facilityPatientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationalId: string;
  phone: string;
  county: string;
  subCounty: string;
}

export interface AdvancedSettings {
  timeout: number; // in seconds
  retryPolicy: {
    maxRetries: number;
    backoff: number;
  };
  dataQualityRules: {
    rejectMissingDob: boolean;
    rejectMissingGender: boolean;
    rejectMissingName: boolean;
  };
}

export interface Facility {
  id: string;
  name: string;
  code: string;
  shortCode?: string; // Short code for the facility
  color?: string; // Color for UI representation
  type: FacilityType;
  county: string;
  subCounty: string;
  address: string;
  contact: FacilityContact;
  connectionType: ConnectionType;
  fhirSettings?: FhirSettings;
  csvSettings?: CsvSettings;
  syncSchedule: string; // Cron expression
  syncMode: SyncMode;
  fieldMapping: FieldMapping;
  advancedSettings: AdvancedSettings;
  lastSync: string; // ISO timestamp
  status: FacilityStatus;
  patientsContributed: number;
  dataQualityScore: number; // 0-100
}
