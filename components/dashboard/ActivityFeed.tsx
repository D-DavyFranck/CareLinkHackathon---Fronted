'use client';

import React from 'react';
import { GitMerge, Eye, UserPlus, ShieldCheck, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { useMatchStore } from '@/lib/stores/useMatchStore';

const iconMap = {
  AUTO_MATCH: { icon: GitMerge, color: 'bg-success/10 text-success' },
  MATCH_CONFIRMED: { icon: GitMerge, color: 'bg-success/10 text-success' },
  MATCH_DISMISSED: { icon: Eye, color: 'bg-red-500/10 text-red-500' },
  SYSTEM: { icon: RefreshCw, color: 'bg-gray-100 text-gray-500' },
  REVIEW: { icon: Eye, color: 'bg-warning/10 text-warning' },
  NEW_PATIENT: { icon: UserPlus, color: 'bg-primary-mid/10 text-primary-mid' },
  IPRS: { icon: ShieldCheck, color: 'bg-accent/10 text-accent' },
  SYNC: { icon: RefreshCw, color: 'bg-gray-100 text-gray-500' },
};

const facilityColors = {
  'KNH': 'bg-emerald-100 text-emerald-700',
  'Nairobi West': 'bg-blue-100 text-blue-700',
  'Aga Khan': 'bg-teal-100 text-teal-700',
  'System': 'bg-gray-100 text-gray-700',
};

export function ActivityFeed() {
  const { activityLogs } = useMatchStore();

  return (
    <div className="bg-card border border-border rounded-xl p-3 sm:p-4 md:p-6 flex flex-col hover:border-primary/50 hover:shadow-md transition-all h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">Recent Activity</h3>
        <button className="text-[10px] sm:text-xs font-bold text-accent hover:underline uppercase tracking-widest">View All</button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] pr-1 sm:pr-2 space-y-2 custom-scrollbar">
        {activityLogs.map((activity) => {
          const config = iconMap[activity.type as keyof typeof iconMap] || iconMap.SYSTEM;
          return (
            <div key={activity.id} className="flex items-start gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted transition-colors group">
              <div className={`p-1.5 sm:p-2 rounded-full shrink-0 ${config.color}`}>
                <config.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">{activity.message}</p>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                  <span className={`text-[8px] sm:text-[9px] font-bold uppercase px-1.5 sm:px-2 py-0.5 rounded-full ${facilityColors['System' as keyof typeof facilityColors] || 'bg-muted text-muted-foreground'}`}>
                    System
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
