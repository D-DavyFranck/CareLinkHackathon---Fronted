'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  ChevronDownIcon, 
  DotsHorizontalIcon,
  CheckCircledIcon,
  SunIcon,
  DragHandleDots2Icon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { MatchQueueItem } from '@/types/matching';
import { DetailedReviewPanel } from '@/components/matching/DetailedReviewPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { useMatchStore } from '@/lib/stores/useMatchStore';
import { toast } from 'sonner';

export default function MatchQueuePage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedItem, setSelectedItem] = useState<MatchQueueItem | null>(null);
  
  const { queueItems, fetchQueue, confirmMatch, dismissMatch } = useMatchStore();

  useEffect(() => {
     fetchQueue();
  }, [fetchQueue]);

  const handleConfirm = (id: string) => {
    confirmMatch(id);
    toast.success(`Match successfully merged! New Master Patient created.`);
    setSelectedItem(null);
  };

  const handleReject = (id: string) => {
    dismissMatch(id);
    toast.info(`Match rejected and removed from queue.`);
    setSelectedItem(null);
  };

  const tabs = [
    { id: 'pending', label: 'Pending Review', count: queueItems.length },
    { id: 'iprs', label: 'IPRS Verification', count: 0 },
    { id: 'resolved', label: 'Resolved' },
  ];

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Match Queue</h1>
        <p className="text-muted-foreground">Review and resolve potential patient record matches from integrated health facilities.</p>
      </div>

      {/* Tabs and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-secondary/50 p-1 rounded-xl border border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                activeTab === tab.id 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="bg-muted px-1.5 py-0.5 rounded text-[10px]">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search queue..." 
              className="pl-9 w-64 h-9 bg-card"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <MixerHorizontalIcon className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Candidate Details</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Source Facility</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Match Score</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Signals</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Time Waiting</th>
              <th className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queueItems.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors group">
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">{item.recordA.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                      <span>{item.recordA.dob}</span>
                      <span>•</span>
                      <span>{item.recordA.gender}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-foreground">{item.recordA.facilityName}</span>
                    <span className="text-[10px] font-mono text-emerald-600">{item.recordA.mrn}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col items-center gap-1">
                    <span className={cn(
                      "text-sm font-black",
                      item.confidence >= 0.85 ? "text-emerald-500" : "text-amber-500"
                    )}>
                      {Math.round(item.confidence * 100)}%
                    </span>
                    <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all",
                          item.confidence >= 0.85 ? "bg-emerald-500" : "bg-amber-500"
                        )}
                        style={{ width: `${item.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {item.signals.name >= 0.9 && <Badge variant="outline" className="text-[8px] py-0 px-1 border-emerald-500/20 text-emerald-600">Name Match</Badge>}
                    {item.signals.dob >= 0.9 && <Badge variant="outline" className="text-[8px] py-0 px-1 border-emerald-500/20 text-emerald-600">DOB Match</Badge>}
                    {item.signals.phone >= 0.8 && <Badge variant="outline" className="text-[8px] py-0 px-1 border-emerald-500/20 text-emerald-600">Phone Match</Badge>}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs text-muted-foreground">{item.timeWaiting}</span>
                </td>
                <td className="p-4 text-right">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 gap-2 text-emerald-600 font-bold hover:bg-emerald-500/10"
                    onClick={() => setSelectedItem(item)}
                  >
                    Review Match
                    <ChevronRightIcon className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DetailedReviewPanel 
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirm={handleConfirm}
        onReject={handleReject}
      />
    </div>
  );
}
