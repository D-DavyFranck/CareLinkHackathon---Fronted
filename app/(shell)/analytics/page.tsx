'use client';

import React from 'react';
import { MatchPerformance } from '@/components/analytics/MatchPerformance';
import { DataQualityMetrics } from '@/components/analytics/DataQualityMetrics';
import { CoverageActivity } from '@/components/analytics/CoverageActivity';
import { ReviewQueueAnalytics } from '@/components/analytics/ReviewQueueAnalytics';
import { BarChartIcon, DownloadIcon, CalendarIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

export default function AnalyticsDashboardPage() {
  
  const handleExport = () => {
    toast.success("Exporting dashboard report as PDF...");
  };

  const handleScheduleReport = () => {
    toast.info("Opening report scheduling center mock...");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary">
            <BarChartIcon className="w-5 h-5" />
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            MPI Performance & Insights: System health and data quality overview.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                onClick={handleScheduleReport}
                className="flex items-center gap-2 px-4 py-2 border border-border bg-card text-foreground rounded-lg text-sm font-semibold hover:bg-muted/50 transition-colors shadow-sm"
            >
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                Schedule Report
            </button>
            <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
                <DownloadIcon className="w-4 h-4" />
                Export Data
            </button>
        </div>
      </div>

      <div className="space-y-12">
          {/* Section 1: Core Matching Effectiveness */}
          <MatchPerformance />
          
          <hr className="border-border" />
          
          {/* Section 2: Incoming Data Health */}
          <DataQualityMetrics />
          
          <hr className="border-border" />
          
          {/* Section 3: Volumes and Footprint */}
          <CoverageActivity />
          
          <hr className="border-border" />
          
          {/* Section 4: Operational Bottlenecks */}
          <ReviewQueueAnalytics />
      </div>
      
    </div>
  );
}
