'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  PersonIcon, 
  PlusIcon, 
  CalendarIcon, 
  ActivityLogIcon, 
  CardStackIcon,
  CheckCircledIcon,
  FileTextIcon
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const hmsStats = [
  { label: "Today's Registrations", value: '24', icon: PlusIcon, color: 'bg-emerald-500', trend: '+12%' },
  { label: 'Active Inpatients', value: '156', icon: PersonIcon, color: 'bg-blue-500', trend: '-2%' },
  { label: 'Scheduled Appointments', value: '42', icon: CalendarIcon, color: 'bg-purple-500', trend: '+5%' },
  { label: 'Pending Lab Results', value: '18', icon: ActivityLogIcon, color: 'bg-orange-500', trend: '+8%' },
];

export default function HMSDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">KNH Hospital Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Administrator. Here&apos;s what&apos;s happening today at Kenyatta National Hospital.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-4 py-2 bg-emerald-500/10 border-emerald-500/20 text-emerald-600 gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">System Online</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hmsStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:border-emerald-500/50 hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-xl text-white shadow-lg", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant={stat.trend.startsWith('+') ? "default" : "destructive"} className={cn(
                    "text-[10px] font-bold",
                    stat.trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                  )}>
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 hover:border-emerald-500/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ActivityLogIcon className="w-5 h-5 text-emerald-500" />
              Recent Registrations
            </CardTitle>
            <Button variant="link" className="text-xs font-bold text-emerald-500 uppercase tracking-wider p-0 h-auto">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'John Doe', id: 'KNH-2024-001', time: '10:15 AM', status: 'Inpatient' },
              { name: 'Jane Smith', id: 'KNH-2024-002', time: '09:45 AM', status: 'Outpatient' },
              { name: 'Michael Brown', id: 'KNH-2024-003', time: '09:12 AM', status: 'Emergency' },
              { name: 'Emily Davis', id: 'KNH-2024-004', time: '08:55 AM', status: 'Inpatient' },
            ].map((reg, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                    {reg.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{reg.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{reg.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground">{reg.status}</p>
                  <p className="text-[10px] text-muted-foreground">{reg.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="hover:border-emerald-500/50 transition-all">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CardStackIcon className="w-5 h-5 text-emerald-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <Button className="w-full bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 h-12 rounded-xl">
                <PlusIcon className="w-5 h-5 mr-2" />
                Register New Patient
              </Button>
              <Button variant="outline" className="w-full font-bold h-12 rounded-xl border-border">
                <CalendarIcon className="w-5 h-5 mr-2 text-emerald-500" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full font-bold h-12 rounded-xl border-border">
                <FileTextIcon className="w-5 h-5 mr-2 text-emerald-500" />
                Generate Hospital Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-emerald-500/5 border-emerald-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <CheckCircledIcon className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">MPI Sync Status</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Last synchronized with UniHealth MPI at 10:00 AM. 12 records updated.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
