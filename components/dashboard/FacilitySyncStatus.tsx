'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { mockFacilities } from '@/lib/mock-data/facilities';
import { toast } from 'sonner';

export function FacilitySyncStatus() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    toast.info('Sync triggered for all facilities');
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Facility sync completed successfully');
    }, 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-3 sm:p-4 md:p-6 flex flex-col hover:border-primary/50 hover:shadow-md transition-all h-full">
      <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight mb-4 sm:mb-6">Facility Sync Status</h3>

      <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto">
        {mockFacilities.map((facility) => (
          <div key={facility.id} className="pb-3 sm:pb-4 border-b border-border last:border-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="text-sm font-bold text-foreground">{facility.name}</h4>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{facility.type}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  facility.status === 'Active' ? 'bg-success/10 text-accent' :
                  facility.status === 'Error' ? 'bg-destructive/10 text-destructive' :
                  'bg-muted/10 text-muted-foreground'
                }`}>
                  {facility.status}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-1 font-medium">Last sync: {new Date(facility.lastSync).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                <span>Data Quality Score</span>
                <span>{facility.dataQualityScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-1000" 
                  style={{ width: `${facility.dataQualityScore}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleManualSync}
        disabled={isSyncing}
        className="mt-4 sm:mt-6 w-full py-2 sm:py-3 border-2 border-primary text-primary font-bold text-[10px] sm:text-xs rounded-xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${isSyncing ? 'animate-spin' : ''}`} />
        TRIGGER MANUAL SYNC
      </button>
    </div>
  );
}
