'use client';

import React from 'react';
import { Encounter, EncounterType } from '@/types/encounter';
import { mockFacilities } from '@/lib/mock-data/facilities';
import { cn } from '@/lib/utils';

interface VisitTimelineProps {
  encounters: Encounter[];
  selectedEncounterId: string;
  onSelect: (id: string) => void;
}

const typeColors = {
  [EncounterType.EMERGENCY]: 'bg-danger',
  [EncounterType.INPATIENT]: 'bg-primary',
  [EncounterType.OUTPATIENT]: 'bg-accent',
  [EncounterType.CARDIOLOGY]: 'bg-purple-500',
  [EncounterType.SURGERY]: 'bg-orange-500',
};

export function VisitTimeline({ encounters, selectedEncounterId, onSelect }: VisitTimelineProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Visit History</h3>
        <div className="flex gap-1">
           {['All', 'KNH', 'NW'].map(f => (
             <button key={f} className="px-2 py-0.5 text-[9px] font-bold rounded bg-muted text-muted-foreground hover:bg-secondary transition-colors">
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="relative pl-3 space-y-4">
        <div className="absolute left-[18px] top-2 bottom-2 w-[1px] bg-border" />
        
        {encounters.map((encounter) => {
          const facility = mockFacilities.find(f => f.id === encounter.facilityId);
          const isSelected = selectedEncounterId === encounter.id;
          
          return (
            <div key={encounter.id} className="relative flex items-start group">
              <div className={cn(
                "absolute left-0 top-3 w-3 h-3 rounded-full border-2 border-background z-10 transition-transform group-hover:scale-125",
                typeColors[encounter.type] || 'bg-muted-foreground'
              )} />
              
              <div 
                onClick={() => onSelect(encounter.id)}
                className={cn(
                  "ml-6 p-3 rounded-xl border transition-all cursor-pointer flex-1",
                  isSelected 
                    ? "bg-accent/10 border-accent shadow-sm" 
                    : "bg-card border-border hover:border-primary/50 hover:shadow-md"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-tighter">
                    {facility?.shortCode}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">{encounter.date}</span>
                </div>
                <h4 className="text-sm font-bold text-foreground leading-tight">{encounter.department}</h4>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium italic">
                  {encounter.diagnoses[0]?.code} — {encounter.diagnoses[0]?.description}
                </p>
                <p className="text-[9px] text-muted-foreground mt-1 font-bold uppercase tracking-wider">{encounter.attendingDoctor}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
