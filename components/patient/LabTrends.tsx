'use client';

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceArea 
} from 'recharts';

const mockLabData = [
  { date: 'Feb 10', hba1c: 7.2, glucose: 135 },
  { date: 'Apr 15', hba1c: 7.0, glucose: 128 },
  { date: 'Jul 22', hba1c: 6.8, glucose: 110 },
  { date: 'Sep 05', hba1c: 6.5, glucose: 105 },
  { date: 'Nov 18', hba1c: 6.4, glucose: 98 },
];

export function LabTrends() {
  const [selectedTest, setSelectedTest] = useState<'hba1c' | 'glucose'>('hba1c');

  return (
    <div className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Lab Trends</h4>
        <select 
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value as 'hba1c' | 'glucose')}
          className="text-xs bg-secondary border border-border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="hba1c">HbA1c (%)</option>
          <option value="glucose">Fasting Glucose (mg/dL)</option>
        </select>
      </div>

      <div className="h-40 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockLabData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" className="opacity-30" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} dy={5} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} domain={selectedTest === 'hba1c' ? [4, 9] : [70, 160]} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: 'var(--color-card)', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '11px' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            {/* Context/Reference values */}
            {selectedTest === 'hba1c' ? (
                <ReferenceArea y1={4.0} y2={5.6} fill="var(--color-success)" fillOpacity={0.1} />
            ) : (
                <ReferenceArea y1={70} y2={100} fill="var(--color-success)" fillOpacity={0.1} />
            )}
            
            <Line 
               type="monotone" 
               dataKey={selectedTest} 
               name={selectedTest === 'hba1c' ? 'HbA1c Level' : 'Glucose Level'} 
               stroke="var(--color-primary)" 
               strokeWidth={2} 
               dot={{ r: 4, strokeWidth: 2, fill: 'var(--color-card)' }} 
               activeDot={{ r: 6, fill: 'var(--color-primary)' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 text-[9px] text-muted-foreground flex items-center justify-between">
         <span>Green area = Normal Range</span>
         <span className="font-semibold text-primary">{selectedTest === 'hba1c' ? 'Target: < 5.7%' : 'Target: 70-100 mg/dL'}</span>
      </div>
    </div>
  );
}
