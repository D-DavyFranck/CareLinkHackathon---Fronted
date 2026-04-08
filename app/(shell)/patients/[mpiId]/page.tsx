'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMatchStore } from '@/lib/stores/useMatchStore';
import { PatientHeader } from '@/components/patient/PatientHeader';
import { VisitTimeline } from '@/components/patient/VisitTimeline';
import { EncounterDetail } from '@/components/patient/EncounterDetail';
import { PatientIntelligencePanel } from '@/components/patient/PatientIntelligencePanel';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function PatientProfilePage() {
  const params = useParams();
  const router = useRouter();
  const mpiId = params.mpiId as string;

  const { masterPatients, fetchPatients } = useMatchStore();
  const patient = useMemo(() => masterPatients.find(p => p.id === mpiId), [masterPatients, mpiId]);
  
  const [encounters, setEncounters] = useState<any[]>([]);
  const [loadingEncounters, setLoadingEncounters] = useState(true);
  const [selectedEncounterId, setSelectedEncounterId] = useState('');

  // Hydrate context on mount
  useEffect(() => {
    if (masterPatients.length === 0) fetchPatients();
  }, [masterPatients.length, fetchPatients]);

  useEffect(() => {
    async function fetchEncounters() {
      try {
        const res = await fetch(`/api/patients/${mpiId}/encounters`);
        const data = await res.json();
        setEncounters(data);
        if (data.length > 0) setSelectedEncounterId(data[0].id);
      } catch (err) {
        console.error("Failed to load clinical encounters:", err);
      } finally {
        setLoadingEncounters(false);
      }
    }
    fetchEncounters();
  }, [mpiId]);

  const selectedEncounter = useMemo(() => 
    encounters.find(e => e.id === selectedEncounterId) || encounters[0],
    [encounters, selectedEncounterId]
  );

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
          <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Patient Not Found</h2>
          <p className="text-gray-500 mb-8">The patient record with ID <span className="font-mono font-bold">{mpiId}</span> could not be located in the Master Patient Index.</p>
          <button 
            onClick={() => router.back()}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PatientHeader patient={patient} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-3 sticky top-24"
        >
          <VisitTimeline 
            encounters={encounters} 
            selectedEncounterId={selectedEncounterId}
            onSelect={setSelectedEncounterId}
          />
        </motion.div>

        {/* Middle Column: Encounter Detail */}
        <motion.div 
          key={selectedEncounterId}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-6"
        >
          {selectedEncounter ? (
            <EncounterDetail encounter={selectedEncounter} />
          ) : (
            <div className="bg-white p-12 rounded-xl border border-dashed border-gray-200 text-center">
              <p className="text-gray-400 font-medium">Select a visit from the timeline to view details</p>
            </div>
          )}
        </motion.div>

        {/* Right Column: Intelligence */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <PatientIntelligencePanel />
        </motion.div>
      </div>
    </div>
  );
}

function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
