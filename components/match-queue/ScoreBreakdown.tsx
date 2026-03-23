'use client';

import React from 'react';
import { MatchQueueItem } from '@/types/matching';
import { cn } from '@/lib/utils';

interface ScoreBreakdownProps {
  item: MatchQueueItem;
}

export function ScoreBreakdown({ item }: ScoreBreakdownProps) {
  const signals = [
    { label: 'Name similarity', score: item.signals.name },
    { label: 'Date of birth', score: item.signals.dob },
    { label: 'Phone number', score: item.signals.phone },
    { label: 'Gender', score: item.signals.gender },
    { label: 'National ID', score: item.signals.nid },
    { label: 'County', score: item.signals.county },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Confidence Breakdown</h3>
      
      <div className="space-y-4">
        {signals.map((signal) => (
          <div key={signal.label} className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
              <span className="text-gray-500">{signal.label}</span>
              <span className={cn(
                signal.score >= 0.9 ? "text-success" :
                signal.score >= 0.7 ? "text-warning" :
                signal.score > 0 ? "text-danger" :
                "text-gray-400"
              )}>
                {Math.round(signal.score * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  signal.score >= 0.9 ? "bg-success" :
                  signal.score >= 0.7 ? "bg-warning" :
                  "bg-danger"
                )}
                style={{ width: `${signal.score * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
        <div className="text-4xl font-mono font-bold text-primary leading-none">
          {Math.round(item.confidence * 100)}%
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Composite confidence score</p>
      </div>
    </div>
  );
}
