'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMatchStore } from '@/lib/stores/useMatchStore';
import { 
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
  PersonIcon,
  CheckCircledIcon
} from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types/patient';

export default function PatientDashboard() {
  const router = useRouter();
  const { masterPatients, fetchPatients } = useMatchStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
     fetchPatients();
  }, [fetchPatients]);

  const filteredPatients = masterPatients.filter(p => 
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.nationalId && p.nationalId.includes(searchQuery))
  );

  const handleRowClick = (mpiId: string) => {
    router.push(`/patients/${mpiId}`);
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Master Patient Index</h1>
        <p className="text-muted-foreground">View and manage unified patient records across all connected facilities.</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 w-full max-w-md">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search by name, MPI ID, or National ID..." 
              className="pl-9 h-10 w-full bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-10 gap-2">
            <MixerHorizontalIcon className="w-4 h-4" />
            Filters
          </Button>
        </div>
        
        <div className="text-sm font-medium text-muted-foreground">
          Showing {filteredPatients.length} records
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest min-w-[200px]">Patient Details</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">MPI ID</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Demographics</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">National ID</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Facilities</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No patients found matching your search.
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient: Patient) => (
                <tr 
                  key={patient.id} 
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer group"
                  onClick={() => handleRowClick(patient.id)}
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                       <PersonIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {patient.fullName}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{patient.county}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="font-mono bg-primary/5 text-primary border-primary/20">{patient.id}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{patient.dob}</span>
                      <span className="text-xs text-muted-foreground">{patient.gender}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {patient.nationalId ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{patient.nationalId.slice(0, 4)}****</span>
                        {patient.isIprsVerified && (
                           <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                             <CheckCircledIcon className="w-3 h-3" /> IPRS
                           </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Not provided</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {patient.contributingFacilities.map((fac, idx) => (
                        <div 
                          key={idx} 
                          title={fac}
                          className="w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[8px] font-bold text-muted-foreground uppercase tracking-tighter"
                        >
                          {fac.substring(0, 2)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
