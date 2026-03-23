import { Patient, Gender, BloodGroup } from '@/types/patient';

export const mockPatients: Patient[] = [
  {
    id: 'MPI-000124',
    fullName: 'John Kamau Mwangi',
    dob: '1985-03-15',
    gender: Gender.MALE,
    bloodGroup: BloodGroup.O_POS,
    county: 'Nairobi',
    isIprsVerified: true,
    nationalId: '12345678',
    initials: 'JM',
    contributingFacilities: ['knh', 'nairobi-west', 'aga-khan']
  },
  {
    id: 'MPI-000452',
    fullName: 'Sarah Wanjiku Otieno',
    dob: '1992-07-22',
    gender: Gender.FEMALE,
    bloodGroup: BloodGroup.A_POS,
    county: 'Kiambu',
    isIprsVerified: false,
    initials: 'SO',
    contributingFacilities: ['mp-shah', 'knh']
  },
  {
    id: 'MPI-000891',
    fullName: 'David Ochieng Kipchoge',
    dob: '1978-11-05',
    gender: Gender.MALE,
    bloodGroup: BloodGroup.B_NEG,
    county: 'Uasin Gishu',
    isIprsVerified: true,
    nationalId: '87654321',
    initials: 'DK',
    contributingFacilities: ['aga-khan', 'nairobi-hosp']
  }
];
