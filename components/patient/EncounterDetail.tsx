'use client';

import React from 'react';
import { Encounter } from '@/types/encounter';
import { mockFacilities } from '@/lib/mock-data/facilities';
import { AlertTriangle, ClipboardList, Beaker, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EncounterDetailProps {
  encounter: Encounter;
}

export function EncounterDetail({ encounter }: EncounterDetailProps) {
  const facility = mockFacilities.find(f => f.id === encounter.facilityId);

  return (
    <div className="space-y-6">
      {/* Encounter Header */}
      <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
              {encounter.type}
            </span>
            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded uppercase tracking-wider">
              {facility?.shortCode}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">{encounter.date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-1">{encounter.department}</h3>
        <p className="text-sm text-muted-foreground mb-4">Attending: <span className="font-semibold text-foreground">{encounter.attendingDoctor}</span></p>
        
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Chief Complaint</p>
          <p className="text-sm text-foreground italic">&quot;{encounter.chiefComplaint}&quot;</p>
        </div>
      </div>

      {/* Diagnoses */}
      <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="w-5 h-5 text-primary" />
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Diagnoses</h4>
          <span className="ml-auto px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded-full">
            {encounter.diagnoses.length}
          </span>
        </div>
        
        <div className="space-y-3">
          {encounter.diagnoses.map((diag, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors">
              <span className={cn(
                "px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter",
                diag.type === 'PRIMARY' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              )}>
                {diag.type}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary">{diag.code}</span>
                  <span className="text-sm font-medium text-foreground">{diag.description}</span>
                </div>
              </div>
              <span className={cn(
                "px-2 py-0.5 text-[9px] font-bold rounded-full",
                diag.status === 'ACTIVE' ? 'bg-success/10 text-success' :
                diag.status === 'CHRONIC' ? 'bg-warning/10 text-warning' :
                'bg-muted text-muted-foreground'
              )}>
                {diag.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lab Results */}
      <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-4">
          <Beaker className="w-5 h-5 text-primary" />
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Lab Results</h4>
          <span className="ml-auto px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded-full">
            {encounter.labs.length}
          </span>
        </div>
        
        <div className="space-y-3">
          {encounter.labs.map((lab, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-bold text-foreground">{lab.testName}</p>
                <p className="text-[10px] text-muted-foreground font-medium">Ref: {lab.referenceRange}</p>
              </div>
              <div className="text-right">
                <div className={cn(
                  "font-mono text-sm font-bold px-2 py-0.5 rounded flex items-center gap-1.5",
                  lab.status === 'NORMAL' ? 'text-foreground' :
                  lab.status === 'ABNORMAL' ? 'bg-warning/10 text-warning' :
                  'bg-danger/10 text-danger'
                )}>
                  {lab.status === 'CRITICAL' && <AlertTriangle className="w-3 h-3" />}
                  {lab.value}
                </div>
                <p className="text-[9px] text-muted-foreground mt-1">{lab.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-4">
          <Pill className="w-5 h-5 text-primary" />
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Medications</h4>
          <span className="ml-auto px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded-full">
            {encounter.medications.length}
          </span>
        </div>
        
        <div className="space-y-4">
          {encounter.medications.map((med, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">{med.name} <span className="text-muted-foreground font-normal ml-1">{med.strength}</span></p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{med.dosage}</p>
                </div>
                <span className={cn(
                  "px-2 py-0.5 text-[9px] font-bold rounded-full",
                  med.status === 'ACTIVE' ? 'bg-success/10 text-success' :
                  med.status === 'STOPPED' ? 'bg-danger/10 text-danger' :
                  'bg-muted text-muted-foreground'
                )}>
                  {med.status}
                </span>
              </div>
              {med.hasInteractionFlag && (
                <div className="flex items-center gap-2 p-2 bg-warning/5 border border-warning/20 rounded-lg text-warning">
                  <AlertTriangle className="w-3 h-3" />
                  <span className="text-[10px] font-bold">Potential interaction detected</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
