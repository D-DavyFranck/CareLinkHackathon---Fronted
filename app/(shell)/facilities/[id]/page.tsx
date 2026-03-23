'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  Activity,
  User,
  BarChart3,
  Globe,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockFacilities } from '@/lib/mock-data/facilities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function FacilityDashboardPage() {
  const { id } = useParams();
  const facility = mockFacilities.find(f => f.id === id);

  if (!facility) {
    return <div className="p-8">Facility not found</div>;
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-4">
        <Link href="/facilities" className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back to Facilities
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{facility.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">{facility.code}</Badge>
                <span className="text-xs text-muted-foreground">{facility.type} • {facility.county}, {facility.subCounty}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Sync History</Button>
            <Button>Configure Facility</Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Patients', value: facility.patientsContributed.toLocaleString(), icon: User, color: 'text-primary' },
          { label: 'Data Quality', value: `${facility.dataQualityScore}%`, icon: BarChart3, color: 'text-emerald-500' },
          { label: 'Last Sync', value: 'Successful', sub: facility.lastSync, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Errors (24h)', value: '0', icon: AlertTriangle, color: 'text-muted-foreground' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border p-6 rounded-2xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-muted/50", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">Live</Badge>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-foreground">{stat.value}</h3>
            {stat.sub && <p className="text-[10px] text-muted-foreground mt-1">{new Date(stat.sub).toLocaleString()}</p>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Volume Chart Placeholder */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Patient Ingestion Volume
            </h3>
            <select className="text-[10px] font-bold uppercase tracking-widest bg-transparent border-none focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] flex items-end gap-2 px-4">
            {[40, 65, 45, 90, 55, 70, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-primary/20 group-hover:bg-primary/40 transition-all rounded-t-lg relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height * 10}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sync Logs */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Recent Sync Logs
            </h3>
            <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase">View All</Button>
          </div>
          <div className="flex-1 space-y-4">
            {[
              { time: '10 mins ago', action: 'Incremental Sync', status: 'Success', details: '124 records processed' },
              { time: '6 hours ago', action: 'Incremental Sync', status: 'Success', details: '89 records processed' },
              { time: '12 hours ago', action: 'Incremental Sync', status: 'Success', details: '210 records processed' },
              { time: '18 hours ago', action: 'Connection Test', status: 'Success', details: 'Latency: 45ms' },
              { time: '1 day ago', action: 'Full Sync', status: 'Success', details: '12,450 records processed' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                  <div className="w-px flex-1 bg-border group-last:hidden" />
                </div>
                <div className="flex-1 pb-4 border-b border-border group-last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground">{log.action}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.time}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
