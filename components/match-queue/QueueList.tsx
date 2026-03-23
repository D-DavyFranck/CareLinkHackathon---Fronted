'use client';

import React from 'react';
import { useMatchQueueStore } from '@/lib/store/useMatchQueueStore';
import { cn } from '@/lib/utils';

export function QueueList() {
  const { items, selectedItemId, selectItem } = useMatchQueueStore();

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isSelected = selectedItemId === item.id;
        
        return (
          <div
            key={item.id}
            onClick={() => selectItem(item.id)}
            className={cn(
              "p-4 border rounded-xl cursor-pointer transition-all duration-200",
              isSelected 
                ? "bg-primary/5 border-primary shadow-sm" 
                : "bg-white border-gray-100 hover:border-primary/30 hover:bg-gray-50"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn(
                "px-2 py-1 rounded-lg text-xs font-bold font-mono",
                item.confidence >= 0.9 ? "bg-success/10 text-success" :
                item.confidence >= 0.8 ? "bg-warning/10 text-warning" :
                "bg-danger/10 text-danger"
              )}>
                {Math.round(item.confidence * 100)}%
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                  {item.recordA.facilityId.toUpperCase()} → MPI
                </span>
                <span className="text-[9px] text-gray-400 mt-0.5">{item.timeWaiting}</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-800">{item.recordA.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="text-gray-300">→</span> {item.recordB.name}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {[
                { label: 'Name', score: item.signals.name },
                { label: 'DOB', score: item.signals.dob },
                { label: 'Phone', score: item.signals.phone },
              ].map(signal => (
                <span key={signal.label} className={cn(
                  "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest",
                  signal.score >= 0.9 ? "bg-success/10 text-success" :
                  signal.score >= 0.7 ? "bg-warning/10 text-warning" :
                  "bg-gray-100 text-gray-400"
                )}>
                  {signal.label}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
              <code className="text-[10px] font-mono text-gray-400">{item.recordA.mrn}</code>
              <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">
                Review Details
              </button>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm font-medium">Queue is empty</p>
        </div>
      )}
    </div>
  );
}
