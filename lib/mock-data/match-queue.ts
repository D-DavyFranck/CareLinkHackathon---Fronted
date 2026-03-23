import { MatchQueueItem } from '@/types/matching';

export const mockMatchQueue: MatchQueueItem[] = [
  {
    id: 'MQ-001',
    confidence: 0.87,
    recordA: {
      name: 'John Kamau Mwangi',
      dob: '1985-03-15',
      age: 39,
      gender: 'Male',
      nationalId: '12345678',
      phone: '+254722123456',
      address: {
        county: 'Nairobi',
        subCounty: 'Westlands'
      },
      mrn: 'KNH-2024-001847',
      facilityId: 'knh',
      facilityName: 'Kenyatta National Hospital',
      visits: [
        { date: '2024-12-02', department: 'Cardiology', diagnosis: 'I10 - Essential (primary) hypertension' },
        { date: '2024-11-15', department: 'General Medicine', diagnosis: 'J00 - Acute nasopharyngitis [common cold]' },
        { date: '2024-10-20', department: 'Cardiology', diagnosis: 'I10 - Essential (primary) hypertension' }
      ]
    },
    recordB: {
      name: 'J. Kamau Mwangi',
      dob: '1985-03-15',
      age: 39,
      gender: 'Male',
      nationalId: undefined,
      phone: '0722 123 456',
      address: {
        county: 'Nairobi',
        subCounty: 'Dagoretti'
      },
      mrn: 'AKH-99827',
      facilityId: 'aga-khan',
      facilityName: 'Aga Khan University Hospital',
      visits: [
        { date: '2024-11-28', department: 'Internal Medicine', diagnosis: 'I10 - Essential (primary) hypertension' },
        { date: '2024-09-12', department: 'Emergency', diagnosis: 'R50.9 - Fever, unspecified' },
        { date: '2024-05-05', department: 'Internal Medicine', diagnosis: 'Z00.0 - General adult medical examination' }
      ]
    },
    signals: {
      name: 0.92,
      dob: 1.0,
      phone: 0.70,
      gender: 1.0,
      nid: 0,
      county: 0.50
    },
    suggestions: [
      "These records are likely the same person because name and DOB match closely.",
      "Consider that phone numbers differ but could be old vs. new."
    ],
    timeWaiting: '2 hours ago',
    status: 'PENDING'
  },
  {
    id: 'MQ-002',
    confidence: 0.76,
    recordA: {
      name: 'Sarah Wanjiku Otieno',
      dob: '1992-07-22',
      age: 32,
      gender: 'Female',
      nationalId: '23456789',
      phone: '+254733987654',
      address: {
        county: 'Kiambu',
        subCounty: 'Kikuyu'
      },
      mrn: 'NW-9982',
      facilityId: 'nairobi-west',
      facilityName: 'Nairobi West Hospital',
      visits: [
        { date: '2024-11-10', department: 'Obstetrics', diagnosis: 'Z34.0 - Supervision of normal first pregnancy' }
      ]
    },
    recordB: {
      name: 'Sarah W. Otieno',
      dob: '1992-07-22',
      age: 32,
      gender: 'Female',
      nationalId: undefined,
      phone: '0733 987 654',
      address: {
        county: 'Kiambu',
        subCounty: 'Limuru'
      },
      mrn: 'KNH-88271',
      facilityId: 'knh',
      facilityName: 'Kenyatta National Hospital',
      visits: [
        { date: '2024-10-05', department: 'Antenatal Clinic', diagnosis: 'Z34.0 - Supervision of normal first pregnancy' }
      ]
    },
    signals: {
      name: 0.82,
      dob: 1.0,
      phone: 0.88,
      gender: 1.0,
      nid: 0,
      county: 1.0
    },
    suggestions: [
      "Name and DOB are exact matches.",
      "Both records indicate similar clinical context (Antenatal/Obstetrics)."
    ],
    timeWaiting: '45 mins ago',
    status: 'PENDING'
  }
];
