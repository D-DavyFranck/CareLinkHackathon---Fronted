'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  FileTextIcon, 
  ActivityLogIcon,
  CheckCircledIcon,
  ClockIcon
} from '@radix-ui/react-icons';
import { Beaker, Pill } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function HMSEHRDetail() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-emerald-600 transition-colors font-bold text-sm p-0">
          <Link href="/hms/patients">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Records
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold text-sm h-10">
            Print Record
          </Button>
          <Button className="bg-emerald-500 text-white font-bold text-sm h-10 hover:bg-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20">
            Add Visit Note
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl border border-border p-8 hover:border-emerald-500/50 transition-all shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-3xl font-bold">
              JD
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">John Doe</h2>
                <Badge variant="outline" className="font-mono text-xs font-bold text-emerald-600 bg-emerald-500/5 border-emerald-500/20 px-2 py-1">
                  {id}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {['39 years', 'Male', 'O+', 'Nairobi'].map((pill) => (
                  <Badge key={pill} variant="secondary" className="text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-0.5">
                    {pill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:items-end justify-between gap-4">
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Hospital Status</p>
              <Badge className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/20 hover:bg-emerald-600">
                Active Inpatient
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClockIcon className="w-4 h-4" />
              <span className="text-xs font-medium">Last updated: 2 hours ago</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-2xl border border-border p-6 hover:border-emerald-500/50 transition-all">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <ActivityLogIcon className="w-5 h-5 text-emerald-500" />
                Recent Hospital Visits
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {[
                { date: 'Dec 02, 2024', dept: 'Cardiology', reason: 'Routine Checkup', doctor: 'Dr. Sarah Mwangi' },
                { date: 'Nov 15, 2024', dept: 'General Medicine', reason: 'Fever and Fatigue', doctor: 'Dr. James Kamau' },
              ].map((visit, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{visit.dept}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">{visit.date}</span>
                  </div>
                  <h4 className="font-bold text-foreground">{visit.reason}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Attending: {visit.doctor}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border p-6 hover:border-emerald-500/50 transition-all">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-emerald-500" />
                Clinical Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50 italic text-sm text-foreground leading-relaxed">
                &quot;Patient reports significant improvement in breathing since starting the new medication. Blood pressure remains stable at 120/80. Recommended continuing current regimen and returning for follow-up in two weeks.&quot;
                <div className="mt-4 flex items-center justify-between not-italic">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Dec 02, 2024 — Dr. Sarah Mwangi</span>
                  <Button variant="link" className="text-[10px] font-bold text-emerald-500 hover:no-underline uppercase p-0 h-auto">Edit Note</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-2xl border border-border p-6 hover:border-emerald-500/50 transition-all">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <CheckCircledIcon className="w-5 h-5 text-emerald-500" />
                Active Medications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {[
                { name: 'Lisinopril', dose: '10mg Daily', status: 'Active' },
                { name: 'Metformin', dose: '500mg Twice Daily', status: 'Active' },
              ].map((med, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                  <div>
                    <p className="text-sm font-bold text-foreground">{med.name}</p>
                    <p className="text-[10px] text-muted-foreground">{med.dose}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border p-6 hover:border-emerald-500/50 transition-all">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <ActivityLogIcon className="w-5 h-5 text-emerald-500" />
                Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'BP', value: '120/80', unit: 'mmHg' },
                  { label: 'HR', value: '72', unit: 'bpm' },
                  { label: 'Temp', value: '36.8', unit: '°C' },
                  { label: 'SpO2', value: '98', unit: '%' },
                ].map((vital) => (
                  <div key={vital.label} className="p-3 bg-muted/30 rounded-xl border border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">{vital.label}</p>
                    <p className="text-lg font-bold text-foreground">{vital.value}</p>
                    <p className="text-[9px] text-muted-foreground uppercase">{vital.unit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
