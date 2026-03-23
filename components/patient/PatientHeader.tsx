'use client';

import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { Patient } from '@/types/patient';
import { mockFacilities } from '@/lib/mock-data/facilities';

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all flex flex-col lg:flex-row justify-between gap-8">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
          {patient.initials}
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">{patient.fullName}</h2>
            <span className="px-3 py-1 bg-accent/10 text-accent font-mono text-xs font-bold rounded-lg border border-accent/20">
              {patient.id}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['39 years', patient.gender, patient.bloodGroup, `${patient.county} County`].map((pill) => (
              <span key={pill} className="px-3 py-1 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider rounded-full">
                {pill}
              </span>
            ))}
          </div>

          <div className={`inline-flex items-center gap-2 p-2 rounded-lg border mt-2 ${
            patient.isIprsVerified 
              ? 'bg-success/5 border-success/20 text-accent' 
              : 'bg-warning/5 border-warning/20 text-warning'
          }`}>
            {patient.isIprsVerified ? <ShieldCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <div className="flex flex-col">
              <span className="text-xs font-bold">{patient.isIprsVerified ? 'IPRS Verified' : 'IPRS Verification Pending'}</span>
              {patient.isIprsVerified && <span className="text-[10px] font-mono text-muted-foreground font-medium">National ID: {patient.nationalId?.slice(0, 3)}****{patient.nationalId?.slice(-2)}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2 lg:text-right">Contributing Facilities</p>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {patient.contributingFacilities.map((fid) => {
              const facility = mockFacilities.find(f => f.id === fid);
              return (
                <div key={fid} className="flex items-center gap-1.5 px-2 py-1 bg-muted border border-border rounded-lg group cursor-help relative">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: facility?.color }} />
                  <span className="text-[10px] font-bold text-muted-foreground">{facility?.shortCode}</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Last record: Nov 18, 2024
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Visits', value: '14' },
            { label: 'Active Conditions', value: '3' },
            { label: 'Current Meds', value: '2' },
            { label: 'Last Visit', value: 'Dec 02, 2024' },
          ].map((stat) => (
            <div key={stat.label} className="p-3 border border-border rounded-xl bg-muted/30 min-w-[100px]">
              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider leading-none mb-1">{stat.label}</p>
              <p className="text-sm font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
