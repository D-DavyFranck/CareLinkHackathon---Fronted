'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowTopRightIcon, 
  ArrowBottomLeftIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendValue: string;
  trendType: 'up' | 'down';
  subtext: string;
  delay?: number;
}

function KPICard({ title, value, trend, trendValue, trendType, subtext, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-primary/50 hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground tracking-tight">{title}</span>
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
          trendType === 'up' ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
        )}>
          {trendType === 'up' ? <ArrowTopRightIcon className="w-3 h-3" /> : <ArrowBottomLeftIcon className="w-3 h-3" />}
          {trendValue}
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-semibold text-foreground">{trend}</span>
          {trendType === 'up' ? <ArrowTopRightIcon className="w-3 h-3 text-foreground" /> : <ArrowBottomLeftIcon className="w-3 h-3 text-foreground" />}
        </div>
        <p className="text-[10px] text-muted-foreground">{subtext}</p>
      </div>
    </motion.div>
  );
}

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard 
        title="Total Revenue" 
        value="$1,250.00" 
        trend="Trending up this month" 
        trendValue="+12.5%" 
        trendType="up"
        subtext="Visitors for the last 6 months"
        delay={0.1}
      />
      <KPICard 
        title="New Customers" 
        value="1,234" 
        trend="Down 20% this period" 
        trendValue="-20%" 
        trendType="down"
        subtext="Acquisition needs attention"
        delay={0.2}
      />
      <KPICard 
        title="Active Accounts" 
        value="45,678" 
        trend="Strong user retention" 
        trendValue="+12.5%" 
        trendType="up"
        subtext="Engagement exceed targets"
        delay={0.3}
      />
      <KPICard 
        title="Growth Rate" 
        value="4.5%" 
        trend="Steady performance increase" 
        trendValue="+4.5%" 
        trendType="up"
        subtext="Meets growth projections"
        delay={0.4}
      />
    </div>
  );
}
