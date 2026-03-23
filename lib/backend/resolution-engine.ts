import { MasterPatient, SourcePatientRecord } from '@/types/patient';
import { Database, toFrontendSourceRecord, toFrontendSourceRecordFromMaster } from './db';
import { MatchQueueItem } from '@/types/matching';

const AUTO_MATCH_THRESHOLD = 0.95;
const REVIEW_THRESHOLD = 0.70;

// Helper: Levenshtein Distance for strings
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1) // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function calculateStringSimilarity(str1: string, str2: string): number {
  if (!str1 || !str2) return 0;
  const a = str1.toLowerCase().trim();
  const b = str2.toLowerCase().trim();
  if (a === b) return 1.0;
  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return (maxLength - distance) / maxLength;
}

interface MatchResult {
  candidate: MasterPatient;
  confidence: number;
  signals: { name: number; dob: number; phone: number; gender: number; nid: number; county: number; };
}

export const ResolutionEngine = {
  findMatches(source: SourcePatientRecord): MatchResult[] {
    const masterPatients = Database.getMasterPatients();
    const results: MatchResult[] = [];

    for (const master of masterPatients) {
      let totalConfidence = 0;
      const signals = { name: 0, dob: 0, phone: 0, gender: 0, nid: 0, county: 0 };

      // 1. National ID (Deterministic) - Weight: 40%
      if (source.patient.nationalId && master.nationalId) {
        if (source.patient.nationalId === master.nationalId) {
           signals.nid = 1.0;
        }
      }
      totalConfidence += signals.nid * 0.40;

      // 2. First and Last Name (Probabilistic) - Weight: 30% combined
      const firstNameScore = calculateStringSimilarity(source.patient.firstName, master.firstName);
      const lastNameScore = calculateStringSimilarity(source.patient.lastName, master.lastName);
      signals.name = (firstNameScore + lastNameScore) / 2;
      totalConfidence += signals.name * 0.30;

      // 3. DOB (Exact) - Weight: 10%
      if (source.patient.dateOfBirth && master.dateOfBirth) {
         if (source.patient.dateOfBirth === master.dateOfBirth) {
            signals.dob = 1.0;
         }
      }
      totalConfidence += signals.dob * 0.10;

      // 4. Phone (Exact or partial) - Weight: 10%
      if (source.patient.phone && master.phone) {
         if (source.patient.phone === master.phone) {
            signals.phone = 1.0;
         }
      }
      totalConfidence += signals.phone * 0.10;

      // 5. Gender - Weight 10%
      if (source.patient.gender === master.gender) {
         signals.gender = 1.0;
      }
      totalConfidence += signals.gender * 0.10;

      if (totalConfidence >= REVIEW_THRESHOLD) {
        results.push({
           candidate: master,
           confidence: parseFloat(totalConfidence.toFixed(2)),
           signals
        });
      }
    }

    return results.sort((a, b) => b.confidence - a.confidence);
  },

  processNewRegistration(source: SourcePatientRecord) {
    Database.addSourceRecord(source);
    const matches = this.findMatches(source);

    if (matches.length > 0) {
      const bestMatch = matches[0];

      if (bestMatch.confidence >= AUTO_MATCH_THRESHOLD) {
         // Auto Merge
         const mpi = bestMatch.candidate;
         Database.updateMasterPatient(mpi.id, {
            updatedAt: new Date().toISOString(),
            links: [...(mpi.links || []), { facilityId: source.facilityId, sourceId: source.id, confidence: bestMatch.confidence, linkedAt: new Date().toISOString() }]
         });
         return { decision: 'AUTO_MATCH', mpiId: mpi.id };
      } 
      else if (bestMatch.confidence >= REVIEW_THRESHOLD) {
         // Generate Multiple Candidates (up to 3) for the Review Queue
         const reviewCandidates = matches.filter(m => m.confidence >= REVIEW_THRESHOLD).slice(0, 3);
         const generatedQueueIds: string[] = [];

         for (const match of reviewCandidates) {
            const mqi: MatchQueueItem = {
               id: `mq_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
               confidence: match.confidence,
               recordA: toFrontendSourceRecord(source),
               recordB: toFrontendSourceRecordFromMaster(match.candidate),
               signals: match.signals,
               suggestions: ['Algorithm flagged this pair for manual resolution based on similarity scores'],
               timeWaiting: 'Just now',
               status: 'PENDING'
            };
            Database.addMatchQueueItem(mqi);
            generatedQueueIds.push(mqi.id);
         }

         return { decision: 'REVIEW_QUEUED', queueIds: generatedQueueIds };
      }
    }

    // New Patient
    const newMpi: MasterPatient = {
      id: `MPI-${Math.floor(100000 + Math.random() * 900000)}`,
      nationalId: source.patient.nationalId,
      firstName: source.patient.firstName,
      lastName: source.patient.lastName,
      dateOfBirth: source.patient.dateOfBirth,
      gender: source.patient.gender,
      phone: source.patient.phone,
      county: source.patient.county || 'Unknown',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      links: [
        { facilityId: source.facilityId, sourceId: source.id, confidence: 1.0, linkedAt: new Date().toISOString() }
      ]
    };
    Database.addMasterPatient(newMpi);
    return { decision: 'NEW_PATIENT_CREATED', mpiId: newMpi.id };
  }
};
