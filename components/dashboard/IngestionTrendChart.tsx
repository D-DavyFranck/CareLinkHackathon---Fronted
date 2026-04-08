'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 700 },
  { name: 'Aug', value: 1100 },
  { name: 'Sep', value: 800 },
  { name: 'Oct', value: 1200 },
  { name: 'Nov', value: 1000 },
  { name: 'Dec', value: 1400 },
];

export function IngestionTrendChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-3 sm:p-4 md:p-6 flex flex-col gap-4 sm:gap-6 hover:border-primary/50 hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">Total Visitors</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Total for the last 3 months</p>
        </div>
        <div className="flex items-center bg-secondary p-1 rounded-lg overflow-x-auto">
          <button className="px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Last 3 months</button>
          <button className="px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Last 30 days</button>
          <button className="px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold bg-background text-foreground shadow-sm rounded-md transition-all whitespace-nowrap">Last 7 days</button>
        </div>
      </div>

      <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} className="text-foreground" />
                <stop offset="95%" stopColor="currentColor" stopOpacity={0} className="text-foreground" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderColor: 'var(--border)', 
                borderRadius: '8px',
                fontSize: '11px',
                color: 'var(--foreground)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="currentColor" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              className="text-foreground"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
