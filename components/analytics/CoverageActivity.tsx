'use client';

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  BarChart, Bar, Cell
} from 'recharts';
import { mockPatientsPerFacility, mockNewPatients, mockCountyDistribution } from '@/lib/mock-data/analytics';
import { MapIcon } from 'lucide-react';

export function CoverageActivity() {
  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Coverage & Activity</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Patients Per Facility */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col h-[380px] lg:col-span-1">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Patients per Facility</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={mockPatientsPerFacility} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border)" className="opacity-30" />
                <XAxis type="number" hide />
                <YAxis dataKey="facility" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} width={80} />
                <RechartsTooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  formatter={(value: any) => value ? value.toLocaleString?.() || value : value}
                />
                <Bar dataKey="patients" fill="var(--color-primary)" radius={[0, 4, 4, 0]} barSize={20}>
                  {mockPatientsPerFacility.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--color-primary)' : 'var(--color-primary-mid)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Patients Over Time */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col h-[380px] lg:col-span-1">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">New Patients Ingestion (Last 7 Days)</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockNewPatients} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSource" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary-mid)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-primary-mid)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMaster" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" className="opacity-50" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                  labelStyle={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="sourceRecords" name="Source Records" stroke="var(--color-primary-mid)" fillOpacity={1} fill="url(#colorSource)" />
                <Area type="monotone" dataKey="masterPatients" name="Master Patients Created" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorMaster)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Distribution Mock */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col h-[380px] lg:col-span-1 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-muted-foreground/5 pointer-events-none">
            <MapIcon className="w-64 h-64" />
          </div>
          
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 relative z-10">Geographic Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4 relative z-10">County-level master patient density</p>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 relative z-10">
            {mockCountyDistribution.map((item, i) => (
              <div key={item.county} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i === 0 ? 'var(--color-primary)' : 'var(--color-secondary-foreground)', opacity: 1 - i*0.15 }} />
                  <span className="text-sm font-medium text-foreground">{item.county}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground">{item.patients.toLocaleString()}</span>
                  <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(item.patients / mockCountyDistribution[0].patients) * 100}%`, opacity: 1 - i*0.1 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border text-[10px] text-muted-foreground text-center relative z-10">
            Map visualization — Mapbox integration planned for Phase 2.
          </div>
        </div>

      </div>
    </div>
  );
}
