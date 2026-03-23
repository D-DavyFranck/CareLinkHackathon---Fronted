'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Activity,
  Settings,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockFacilities } from '@/lib/mock-data/facilities';
import { Facility } from '@/types/facility';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function FacilitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Inactive': return <XCircle className="w-4 h-4 text-muted-foreground" />;
      case 'Error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Healthcare Facilities</h1>
          <p className="text-muted-foreground">Manage source systems, connection endpoints, and data ingestion schedules.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 px-6">
          <Plus className="w-4 h-4" />
          Add New Facility
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search by name or code..." className="pl-9 bg-card h-10" />
          </div>
          <select className="h-10 px-3 rounded-md border border-input bg-card text-xs font-bold uppercase tracking-wider">
            <option>All Counties</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kiambu</option>
          </select>
          <select className="h-10 px-3 rounded-md border border-input bg-card text-xs font-bold uppercase tracking-wider">
            <option>All Types</option>
            <option>Public Hospital</option>
            <option>Private Clinic</option>
            <option>Lab</option>
          </select>
          <Button variant="outline" className="gap-2 h-10">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Facility Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Facility</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Type & County</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Connection</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Last Sync</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Status</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Patients</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Quality</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockFacilities.map((facility) => (
              <tr key={facility.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors group">
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">{facility.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{facility.code}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-foreground">{facility.type}</span>
                    <span className="text-[10px] text-muted-foreground">{facility.county}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-secondary/50">
                    {facility.connectionType}
                  </Badge>
                </td>
                <td className="p-4">
                  <span className="text-xs text-muted-foreground">{new Date(facility.lastSync).toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <div className={cn(
                      "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                      facility.status === 'Active' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                      facility.status === 'Error' ? "bg-destructive/10 text-destructive border-destructive/20" :
                      "bg-muted/10 text-muted-foreground border-border"
                    )}>
                      {getStatusIcon(facility.status)}
                      {facility.status}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-sm font-bold text-foreground">{facility.patientsContributed.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col items-center gap-1">
                    <span className={cn(
                      "text-xs font-black",
                      facility.dataQualityScore >= 90 ? "text-emerald-500" :
                      facility.dataQualityScore >= 70 ? "text-amber-500" : "text-destructive"
                    )}>
                      {facility.dataQualityScore}%
                    </span>
                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full",
                          facility.dataQualityScore >= 90 ? "bg-emerald-500" :
                          facility.dataQualityScore >= 70 ? "bg-amber-500" : "bg-destructive"
                        )}
                        style={{ width: `${facility.dataQualityScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Link href={`/facilities/${facility.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
