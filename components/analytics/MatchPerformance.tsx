'use client';

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { 
  mockMatchRateData, 
  mockMatchMethodDistribution, 
  mockConfidenceHistogram,
  mockAnalyticsMetrics
} from '@/lib/mock-data/analytics';
import { InfoCircledIcon } from '@radix-ui/react-icons';


export function MatchPerformance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Match Performance</h2>
        <div className="flex items-center gap-2 bg-destructive/10 px-3 py-1.5 rounded-lg border border-destructive/20 cursor-help group relative">
           <InfoCircledIcon className="w-4 h-4 text-destructive" />
           <span className="text-sm font-semibold text-destructive">Est. Duplicate Rate: {mockAnalyticsMetrics.duplicateRateEstimate}%</span>
           
           <div className="absolute hidden group-hover:block z-50 bottom-full right-0 mb-2 w-64 bg-foreground text-background text-xs rounded-lg p-3 shadow-lg">
             Percentage of master patients that may be duplicates based on continuous background algorithmic scanning. A rate below 2% is excellent.
             <div className="absolute top-full right-10 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Match Rate Over Time */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col h-[350px]">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Match Rate (Last 7 Days)</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMatchRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" className="opacity-50" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                  labelStyle={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="autoMatched" name="Auto" stroke="var(--color-success)" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="manualMatched" name="Manual" stroke="var(--color-primary-mid)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="unmatched" name="Unmatched" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Match Method Distribution */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col h-[350px]">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Match Method Distribution</h3>
          <div className="flex-1 min-h-0 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockMatchMethodDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {mockMatchMethodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Custom Legend */}
            <div className="absolute -bottom-2 left-0 right-0 flex flex-wrap justify-center gap-x-4 gap-y-2">
               {mockMatchMethodDistribution.map((entry, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                     <span className="text-[10px] text-muted-foreground whitespace-nowrap">{entry.name} ({entry.value}%)</span>
                  </div>
               ))}
            </div>
          </div>
        </div>

        {/* Confidence Score Histogram */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col h-[350px] lg:col-span-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Confidence Score Distribution</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockConfidenceHistogram} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" className="opacity-50" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  
                  formatter={(value) => value !== undefined ? [`${value.toLocaleString()} matches`, 'Count'] : ['', 'Count']}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {mockConfidenceHistogram.map((entry, index) => {
                     let fill = 'var(--color-success)';
                     if (entry.range.startsWith('0.7') || entry.range.startsWith('0.8')) fill = 'var(--color-warning)';
                     if (entry.range.startsWith('<0.5') || entry.range.startsWith('0.5') || entry.range.startsWith('0.6')) fill = 'hsl(var(--muted-foreground)/0.3)';
                     return <Cell key={`cell-${index}`} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}