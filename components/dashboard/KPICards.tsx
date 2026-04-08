'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
      className="bg-card border border-border rounded-xl p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 hover:border-primary/50 hover:shadow-md transition-all group min-h-[120px] sm:min-h-[140px]"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-medium text-muted-foreground tracking-tight">{title}</span>
        <div className={cn(
          "flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold",
          trendType === 'up' ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
        )}>
          {trendType === 'up' ? <ArrowTopRightIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <ArrowBottomLeftIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
          {trendValue}
        </div>
      </div>
      
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight">{value}</h3>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
          <span className="text-[9px] sm:text-xs font-semibold text-foreground">{trend}</span>
          {trendType === 'up' ? <ArrowTopRightIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground" /> : <ArrowBottomLeftIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground" />}
        </div>
        <p className="text-[8px] sm:text-[10px] text-muted-foreground mt-auto">{subtext}</p>
      </div>
    </motion.div>
  );
}

export function KPICards() {
  return (
    <>
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
    </>
  );
}
