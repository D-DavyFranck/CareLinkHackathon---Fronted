'use client';

import React from 'react';
import { MatchQueueItem } from '@/types/matching';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ComparisonTableProps {
  item: MatchQueueItem;
}

export function ComparisonTable({ item }: ComparisonTableProps) {
  const fields = [
    { label: 'Full Name', incoming: item.recordA.name, master: item.recordB.name, score: item.signals.name },
    { label: 'Date of Birth', incoming: item.recordA.dob, master: item.recordB.dob, score: item.signals.dob },
    { label: 'Gender', incoming: item.recordA.gender, master: item.recordB.gender, score: item.signals.gender },
    { label: 'National ID', incoming: item.recordA.nationalId || 'Not provided', master: item.recordB.nationalId || 'Not set', score: item.signals.nid },
    { label: 'Phone', incoming: item.recordA.phone, master: item.recordB.phone, score: item.signals.phone },
    { label: 'County', incoming: item.recordA.address.county, master: item.recordB.address.county, score: item.signals.county },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-primary">Identity Comparison</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30">
              <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Field</th>
              <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Incoming Record ({item.recordA.facilityId.toUpperCase()})</th>
              <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Master Patient ({item.recordB.mrn})</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.label} className={cn(
                "group transition-colors",
                field.score >= 0.9 ? "bg-success/5 hover:bg-success/10" :
                field.score >= 0.7 ? "bg-warning/5 hover:bg-warning/10" :
                field.score > 0 ? "bg-danger/5 hover:bg-danger/10" :
                "hover:bg-gray-50"
              )}>
                <td className="p-4 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-tight">{field.label}</td>
                <td className="p-4 border-b border-gray-100 text-sm font-medium text-gray-800">{field.incoming}</td>
                <td className="p-4 border-b border-gray-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-gray-900">{field.master}</span>
                    <div className="flex items-center gap-1.5">
                      {field.score >= 0.9 ? (
                        <CheckCircle2 className="w-3 h-3 text-success" />
                      ) : field.score >= 0.7 ? (
                        <AlertCircle className="w-3 h-3 text-warning" />
                      ) : field.score > 0 ? (
                        <XCircle className="w-3 h-3 text-danger" />
                      ) : null}
                      <span className={cn(
                        "text-[10px] font-bold",
                        field.score >= 0.9 ? "text-success" :
                        field.score >= 0.7 ? "text-warning" :
                        field.score > 0 ? "text-danger" :
                        "text-gray-400"
                      )}>
                        {field.score === 1 ? 'Exact match ✓' : 
                         field.score > 0 ? `${Math.round(field.score * 100)}% similar` : 
                         'Not comparable'}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
