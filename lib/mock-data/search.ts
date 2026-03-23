import { SearchResult } from '@/types/search';

export const mockSearchResults: SearchResult[] = [
  // John Kamau Mwangi variants
  {
    id: 'MPI-000124',
    mpiId: 'MPI-000124',
    type: 'MASTER',
    title: 'John Kamau Mwangi',
    subtitle: 'NID: 1234****78 • +254 722 123 456',
    matchSignal: 'Exact Match'
  },
  {
    id: 'KNH-2024-001847',
    mpiId: 'MPI-000124',
    type: 'SOURCE',
    title: 'J. Kamau Mwangi',
    subtitle: 'KNH • MRN: KNH-2024-001847',
    matchSignal: 'Matched by Partial Name & Phone',
    confidence: 91
  },
  {
    id: 'NW-9982',
    mpiId: 'MPI-000124',
    type: 'SOURCE',
    title: 'John K. Mwangi',
    subtitle: 'Nairobi West • MRN: NW-9982',
    matchSignal: 'Matched by Name & DOB',
    confidence: 96
  },
  // Sarah Wanjiku Otieno variants
  {
    id: 'MPI-000452',
    mpiId: 'MPI-000452',
    type: 'MASTER',
    title: 'Sarah Wanjiku Otieno',
    subtitle: '+254 733 987 654',
    matchSignal: 'Exact Match'
  },
  {
    id: 'MPS-55-901',
    mpiId: 'MPI-000452',
    type: 'SOURCE',
    title: 'Sarah Wanjiku Otieno',
    subtitle: 'MP Shah • MRN: MPS-55-901',
    matchSignal: 'Matched by Phone',
    confidence: 99
  },
  // David Ochieng Kipchoge variants
  {
    id: 'MPI-000891',
    mpiId: 'MPI-000891',
    type: 'MASTER',
    title: 'David Ochieng Kipchoge',
    subtitle: 'NID: 8765****21 • +254 711 222 333',
    matchSignal: 'Exact Match'
  },
  // Facilities
  {
    id: 'FAC-KNH',
    mpiId: 'knh', // acts as facility id here for routing later
    type: 'FACILITY',
    title: 'Kenyatta National Hospital (KNH)',
    subtitle: 'Nairobi County • Level 6',
    matchSignal: 'Facility Match'
  },
  {
    id: 'FAC-NWH',
    mpiId: 'nairobi-west', 
    type: 'FACILITY',
    title: 'Nairobi West Hospital',
    subtitle: 'Nairobi County • Level 5',
    matchSignal: 'Facility Match'
  }
];

// Helper search function mimicking a fuzzy search backend
export function performSearch(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length < 2) return [];

  return mockSearchResults.filter(result => 
    result.title.toLowerCase().includes(normalizedQuery) ||
    result.subtitle.toLowerCase().includes(normalizedQuery) ||
    result.id.toLowerCase().includes(normalizedQuery) ||
    result.mpiId.toLowerCase().includes(normalizedQuery)
  );
}
