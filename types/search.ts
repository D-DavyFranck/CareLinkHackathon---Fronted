export interface SearchResult {
  id: string; // mpiId or source record id
  mpiId: string; // The target MPI record to navigate to
  type: 'MASTER' | 'SOURCE' | 'FACILITY';
  title: string; // Name for patient, MRN for source
  subtitle: string; // National ID, Phone, or Facility Name
  matchSignal: string; // What matched? (e.g. "Matched by Phone")
  confidence?: number; // for source records
}
