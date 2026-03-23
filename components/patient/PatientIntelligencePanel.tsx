'use client';

import React from 'react';
import { AlertTriangle, MapPin, Database, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { mockFacilities } from '@/lib/mock-data/facilities';
import { LabTrends } from './LabTrends';

const visitData = [
  { month: 'Jan', count: 1 },
  { month: 'Feb', count: 0 },
  { month: 'Mar', count: 2 },
  { month: 'Apr', count: 1 },
  { month: 'May', count: 3 },
  { month: 'Jun', count: 1 },
  { month: 'Jul', count: 0 },
  { month: 'Aug', count: 2 },
  { month: 'Sep', count: 1 },
  { month: 'Oct', count: 2 },
  { month: 'Nov', count: 1 },
  { month: 'Dec', count: 1 },
];

export function PatientIntelligencePanel() {
  return (
    <div className="space-y-6">
      {/* Active Conditions */}
      <div className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Active Conditions</h4>
        <div className="space-y-3">
          {[
            { name: 'Hypertension', since: '2022', facilities: 3, severity: 'border-warning' },
            { name: 'Recurring Respiratory Infections', since: '2024', facilities: 4, severity: 'border-primary' },
          ].map((condition) => (
            <div key={condition.name} className={`p-3 border-l-4 ${condition.severity} bg-muted/30 rounded-r-lg`}>
              <p className="text-sm font-bold text-foreground">{condition.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted-foreground font-medium">Since {condition.since}</span>
                <span className="px-1.5 py-0.5 bg-background border border-border text-[9px] font-bold text-muted-foreground rounded-full">
                  Seen at {condition.facilities} facilities
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medication Conflicts */}
      <div className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Medication Overview</h4>
        
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl mb-4">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold">Interaction Warning</span>
          </div>
          <p className="text-[11px] font-bold text-destructive/80">Amoxicillin (KNH) + Azithromycin (Nairobi West)</p>
          <p className="text-[10px] text-destructive/60 mt-1">Concurrent antibiotics prescribed by different facilities.</p>
        </div>

        <div className="space-y-2">
          {[
            { name: 'Amlodipine', facility: 'Aga Khan', date: 'Dec 02, 2024' },
            { name: 'Amoxicillin', facility: 'KNH', date: 'Nov 18, 2024' },
          ].map((med) => (
            <div key={med.name} className="flex items-center justify-between p-2 border border-border rounded-lg">
              <div>
                <p className="text-xs font-bold text-foreground">{med.name}</p>
                <p className="text-[9px] text-muted-foreground">{med.facility}</p>
              </div>
              <span className="text-[9px] text-muted-foreground font-medium">{med.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lab Trends */}
      <LabTrends />

      {/* Visit Analytics */}
      <div className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Visit Patterns</h4>
        </div>
        
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitData}>
              <Bar dataKey="count" fill="var(--primary)" radius={[2, 2, 0, 0]} />
              <XAxis dataKey="month" hide />
              <RechartsTooltip 
                cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)', 
                  borderRadius: '8px',
                  fontSize: '10px',
                  color: 'var(--foreground)'
                }} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-1">
          <p className="text-[10px] text-muted-foreground font-medium">• Most visited: <span className="font-bold text-foreground">KNH (8 visits)</span></p>
          <p className="text-[10px] text-muted-foreground font-medium">• Most common: <span className="font-bold text-foreground">Respiratory (5 cases)</span></p>
        </div>
      </div>

      {/* Facility Map Mock */}
      <div className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Facility Visits</h4>
        </div>
        
        <div className="space-y-3">
          {[
            { county: 'Nairobi', facilities: 'KNH, Nairobi West', visits: 11, percent: 80 },
            { county: 'Mombasa', facilities: 'Coast General', visits: 3, percent: 20 },
          ].map((item) => (
            <div key={item.county} className="space-y-1.5">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-foreground">{item.county}</p>
                  <p className="text-[9px] text-muted-foreground font-medium">{item.facilities}</p>
                </div>
                <span className="text-[10px] font-bold text-primary">{item.visits} visits</span>
              </div>
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-muted-foreground mt-4 text-center italic">Map visualization — connect Mapbox in Phase 2</p>
      </div>

      {/* Source Records */}
      <div className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Source Records</h4>
        </div>
        
        <div className="space-y-2">
          {[
            { facility: 'KNH', hmis: 'FunSoft', id: 'KNH-2024-001847', confidence: 99, method: 'IPRS' },
            { facility: 'Nairobi West', hmis: 'Crane', id: 'NW-9982', confidence: 88, method: 'AUTO' },
          ].map((record) => (
            <div key={record.id} className="p-3 border border-border rounded-xl hover:bg-muted transition-colors">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="text-[10px] font-bold text-foreground">{record.facility}</p>
                  <p className="text-[9px] text-muted-foreground font-medium">{record.hmis}</p>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  record.confidence >= 95 ? 'bg-success/10 text-accent' : 'bg-warning/10 text-warning'
                }`}>
                  {record.confidence}% match
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <code className="text-[10px] font-mono text-primary font-bold">{record.id}</code>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{record.method}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
