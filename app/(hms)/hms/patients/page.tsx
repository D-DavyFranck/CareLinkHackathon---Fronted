'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MagnifyingGlassIcon, 
  MixerHorizontalIcon, 
  ChevronRightIcon, 
  FileTextIcon,
  CalendarIcon,
  PersonIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const hmsPatients = [
  { id: 'KNH-2024-001', name: 'John Doe', age: 39, gender: 'Male', lastVisit: '2024-12-02', status: 'Active' },
  { id: 'KNH-2024-002', name: 'Jane Smith', age: 28, gender: 'Female', lastVisit: '2024-11-28', status: 'Discharged' },
  { id: 'KNH-2024-003', name: 'Michael Brown', age: 45, gender: 'Male', lastVisit: '2024-12-05', status: 'Active' },
  { id: 'KNH-2024-004', name: 'Emily Davis', age: 32, gender: 'Female', lastVisit: '2024-12-01', status: 'Active' },
  { id: 'KNH-2024-005', name: 'Robert Wilson', age: 52, gender: 'Male', lastVisit: '2024-11-15', status: 'Discharged' },
];

export default function HMSElectronicRecords() {
  const [search, setSearch] = useState('');

  const filteredPatients = hmsPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Electronic Health Records</h1>
          <p className="text-muted-foreground mt-1">Manage and view patient records registered at Kenyatta National Hospital.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
            <Input 
              type="text" 
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 w-64 h-11 rounded-xl bg-card"
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
            <MixerHorizontalIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Patient Details</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Hospital ID</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Age/Gender</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Last Visit</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient, idx) => (
              <TableRow 
                key={patient.id}
                className="hover:bg-muted/30 transition-colors group border-b border-border"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold text-sm">
                      {patient.name.charAt(0)}
                    </div>
                    <span className="font-bold text-foreground">{patient.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="outline" className="font-mono text-xs font-bold text-emerald-600 bg-emerald-500/5 border-emerald-500/10">
                    {patient.id}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground font-medium">{patient.age} years</span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{patient.gender}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    {patient.lastVisit}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge className={cn(
                    "text-[10px] font-bold uppercase tracking-wider",
                    patient.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Button asChild variant="ghost" className="h-9 px-4 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold text-xs hover:bg-emerald-500 hover:text-white transition-all group">
                    <Link href={`/hms/patients/${patient.id}`}>
                      View EHR
                      <ChevronRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredPatients.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <PersonIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No patients found</h3>
            <p className="text-muted-foreground">Try adjusting your search or register a new patient.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
