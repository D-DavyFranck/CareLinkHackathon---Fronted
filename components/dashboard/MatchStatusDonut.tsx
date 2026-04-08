'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'AUTO_MATCHED', value: 84.2, color: '#10B981' },
  { name: 'MANUAL_MATCHED', value: 8.1, color: '#0F4C81' },
  { name: 'PENDING_REVIEW', value: 6.4, color: '#F59E0B' },
  { name: 'NO_MATCH', value: 1.3, color: '#9ca3af' },
];

export function MatchStatusDonut() {
  return (
    <div className="bg-card border border-border rounded-xl p-3 sm:p-4 md:p-6 flex flex-col hover:border-primary/50 hover:shadow-md transition-all h-full">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">Match Status</h3>
        <p className="text-[10px] sm:text-xs text-muted-foreground">Identity Resolution Accuracy</p>
      </div>

      <div className="flex-1 relative min-h-[180px] sm:min-h-[220px] md:min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderColor: 'var(--border)', 
                borderRadius: '8px',
                fontSize: '11px',
                color: 'var(--foreground)'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">94.3%</span>
          <span className="text-[8px] sm:text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">Match Rate</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-tight truncate">{item.name.replace('_', ' ')}</span>
              <span className="text-xs sm:text-sm font-bold text-foreground">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
