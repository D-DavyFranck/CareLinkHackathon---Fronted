'use client';

import React from 'react';
import { 
  Cross1Icon, 
  CheckCircledIcon, 
  CrossCircledIcon, 
  InfoCircledIcon,
  CalendarIcon,
  HomeIcon,
  PersonIcon,
  IdCardIcon,
  MobileIcon,
  ActivityLogIcon
} from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { MatchQueueItem, SourceRecord } from '@/types/matching';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DetailedReviewPanelProps {
  item: MatchQueueItem | null;
  onClose: () => void;
  onConfirm: (id: string, note?: string) => void;
  onReject: (id: string) => void;
}

export function DetailedReviewPanel({ item, onClose, onConfirm, onReject }: DetailedReviewPanelProps) {
  if (!item) return null;

  const renderRecordColumn = (record: SourceRecord, title: string) => (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{title}</h3>
        <Badge variant="outline" className="bg-emerald-500/5 text-emerald-600 border-emerald-500/20">
          {record.facilityName}
        </Badge>
      </div>

      {/* Demographics */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <PersonIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Full Name (Raw)</p>
            <p className="text-lg font-bold text-foreground">{record.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">DOB & Age</p>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm font-semibold">{record.dob} ({record.age}y)</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Gender</p>
            <p className="text-sm font-semibold">{record.gender}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">National ID</p>
            <div className="flex items-center gap-2">
              <IdCardIcon className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm font-mono font-bold">
                {record.nationalId ? `${record.nationalId.slice(0, 4)}****` : 'N/A'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Phone Number</p>
            <div className="flex items-center gap-2">
              <MobileIcon className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm font-semibold">{record.phone}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Address</p>
          <div className="flex items-center gap-2">
            <HomeIcon className="w-3 h-3 text-muted-foreground" />
            <p className="text-sm font-semibold">{record.address.county}, {record.address.subCounty}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Facility MRN</p>
          <p className="text-sm font-mono font-bold text-emerald-600">{record.mrn}</p>
        </div>
      </div>

      <Separator />

      {/* Visit History */}
      <div>
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
          <ActivityLogIcon className="w-3 h-3" />
          Last 3 Encounters
        </h4>
        <div className="space-y-3">
          {record.visits.map((visit, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">{visit.department}</span>
                <span className="text-[10px] text-muted-foreground">{visit.date}</span>
              </div>
              <p className="text-xs font-semibold text-foreground">{visit.diagnosis}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComparisonRow = (label: string, valA: any, valB: any, score: number) => {
    const isMatch = score >= 0.9;
    const isFuzzy = score > 0 && score < 0.9;

    return (
      <div className="grid grid-cols-3 py-3 border-b border-border last:border-0 items-center">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className="col-span-2 flex items-center justify-between gap-4">
          <div className="flex-1 grid grid-cols-2 gap-2">
            <span className="text-xs font-semibold truncate">{valA || 'N/A'}</span>
            <span className="text-xs font-semibold truncate">{valB || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 min-w-[60px] justify-end">
            {isMatch ? (
              <CheckCircledIcon className="w-4 h-4 text-emerald-500" />
            ) : isFuzzy ? (
              <span className="text-[10px] font-bold text-amber-500">{Math.round(score * 100)}%</span>
            ) : (
              <CrossCircledIcon className="w-4 h-4 text-destructive" />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl h-[90vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <ShuffleIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground tracking-tight">Detailed Match Review</h2>
                <p className="text-sm text-muted-foreground">Reviewing potential match candidate {item.id}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <Cross1Icon className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left Column - Record A */}
              <div className="lg:col-span-2">
                {renderRecordColumn(item.recordA, "Source Record A")}
              </div>

              {/* Middle Column - Comparison & Score */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                <div className="p-6 rounded-2xl bg-secondary/50 border border-border flex flex-col items-center text-center gap-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Overall Match Score</p>
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-muted"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={276}
                        strokeDashoffset={276 - (276 * item.confidence)}
                        className="text-emerald-500 transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-2xl font-black text-foreground">{Math.round(item.confidence * 100)}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Identifier Comparison</h4>
                  {renderComparisonRow("Name", item.recordA.name, item.recordB.name, item.signals.name)}
                  {renderComparisonRow("DOB", item.recordA.dob, item.recordB.dob, item.signals.dob)}
                  {renderComparisonRow("Gender", item.recordA.gender, item.recordB.gender, item.signals.gender)}
                  {renderComparisonRow("Phone", item.recordA.phone, item.recordB.phone, item.signals.phone)}
                  {renderComparisonRow("ID", item.recordA.nationalId, item.recordB.nationalId, item.signals.nid)}
                  {renderComparisonRow("County", item.recordA.address.county, item.recordB.address.county, item.signals.county)}
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-3">
                  <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                    <InfoCircledIcon className="w-3 h-3" />
                    System Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {item.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-xs text-foreground leading-relaxed flex gap-2">
                        <span className="text-emerald-500">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Record B */}
              <div className="lg:col-span-2">
                {renderRecordColumn(item.recordB, "Source Record B")}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose}>Skip / Review Later</Button>
              <Button variant="ghost" className="text-emerald-600 font-bold">View Full Patient History</Button>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
                onClick={() => onReject(item.id)}
              >
                Reject Match
              </Button>
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
                onClick={() => onConfirm(item.id)}
              >
                Confirm Match
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ShuffleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>
  );
}
