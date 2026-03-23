import { Facility } from '@/types/facility';

export const mockFacilities: Facility[] = [
  {
    id: 'knh',
    name: 'Kenyatta National Hospital',
    code: 'KNH',
    type: 'Public Hospital',
    county: 'Nairobi',
    subCounty: 'Westlands',
    address: 'Hospital Rd, Upper Hill',
    contact: { name: 'Dr. John Doe', email: 'j.doe@knh.or.ke', phone: '+254711223344' },
    connectionType: 'FHIR R4',
    fhirSettings: {
      baseUrl: 'https://knh.fhir.kenyaemr.org/fhir',
      authType: 'OAuth2',
      version: 'R4'
    },
    syncSchedule: '0 */6 * * *',
    syncMode: 'Incremental',
    fieldMapping: {
      facilityPatientId: 'patient.identifier[0].value',
      firstName: 'name[0].given[0]',
      lastName: 'name[0].family',
      dateOfBirth: 'birthDate',
      gender: 'gender',
      nationalId: "identifier.where(type.coding.code='NI').value",
      phone: "telecom.where(system='phone').value",
      county: "address[0].state",
      subCounty: "address[0].district"
    },
    advancedSettings: {
      timeout: 30,
      retryPolicy: { maxRetries: 3, backoff: 2 },
      dataQualityRules: { rejectMissingDob: true, rejectMissingGender: true, rejectMissingName: true }
    },
    lastSync: '2024-12-13T10:00:00Z',
    status: 'Active',
    patientsContributed: 124500,
    dataQualityScore: 98
  },
  {
    id: 'nairobi-west',
    name: 'Nairobi West Hospital',
    code: 'NWH',
    type: 'Private Clinic',
    county: 'Nairobi',
    subCounty: 'Langata',
    address: 'Gandhi Ave, Nairobi',
    contact: { name: 'Jane Smith', email: 'jane.s@nwh.co.ke', phone: '+254722334455' },
    connectionType: 'CSV Upload',
    csvSettings: {
      uploadEndpoint: 'sftp://uploads.nwh.co.ke',
      fileNamingConvention: 'PATIENT_EXPORT_{YYYYMMDD}.csv'
    },
    syncSchedule: '0 0 * * *',
    syncMode: 'Full',
    fieldMapping: {
      facilityPatientId: 'PID',
      firstName: 'FNAME',
      lastName: 'LNAME',
      dateOfBirth: 'DOB',
      gender: 'SEX',
      nationalId: 'ID_NUMBER',
      phone: 'PHONE',
      county: 'COUNTY',
      subCounty: 'SUB_COUNTY'
    },
    advancedSettings: {
      timeout: 60,
      retryPolicy: { maxRetries: 5, backoff: 5 },
      dataQualityRules: { rejectMissingDob: true, rejectMissingGender: false, rejectMissingName: true }
    },
    lastSync: '2024-12-12T23:00:00Z',
    status: 'Active',
    patientsContributed: 45200,
    dataQualityScore: 85
  },
  {
    id: 'coast-gen',
    name: 'Coast General Hospital',
    code: 'CGH',
    type: 'Public Hospital',
    county: 'Mombasa',
    subCounty: 'Mvita',
    address: 'Kisauni Rd, Mombasa',
    contact: { name: 'Ali Hassan', email: 'ali.h@cgh.go.ke', phone: '+254733445566' },
    connectionType: 'Manual Entry',
    syncSchedule: 'Manual',
    syncMode: 'Incremental',
    fieldMapping: {
      facilityPatientId: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationalId: '',
      phone: '',
      county: '',
      subCounty: ''
    },
    advancedSettings: {
      timeout: 10,
      retryPolicy: { maxRetries: 1, backoff: 1 },
      dataQualityRules: { rejectMissingDob: false, rejectMissingGender: false, rejectMissingName: true }
    },
    lastSync: '2024-12-10T15:30:00Z',
    status: 'Error',
    patientsContributed: 8900,
    dataQualityScore: 62
  }
];
