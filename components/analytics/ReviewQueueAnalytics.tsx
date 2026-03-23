'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { ClockIcon, ShuffleIcon, PersonIcon } from '@radix-ui/react-icons';
// Ensure these mock data exports exist and contain the required fields
import { mockQueueSizeTrend, mockAnalyticsMetrics } from '@/lib/mock-data/analytics';

export function ReviewQueueAnalytics() {
  // Fallback values in case mock data is missing or incomplete
  const avgReviewTime = mockAnalyticsMetrics?.avgReviewTimeMinutes ?? 0;
  const reviewerList = mockAnalyticsMetrics?.reviewerPerformance ?? [];
  const queueTrend = Array.isArray(mockQueueSizeTrend) ? mockQueueSizeTrend : [];

  return (
    <div className="space-y-6 mt-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Review Queue Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* KPI Cards Stacked */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Average Review Time */}
          <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col justify-center flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Review Time</p>
                <h3 className="text-2xl font-bold text-foreground">{avgReviewTime} min</h3>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Time spent per match decision across all reviewers.</p>
          </div>

          {/* Reviewer Performance List */}
          <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-foreground font-semibold text-sm">
              <PersonIcon className="w-4 h-4 text-primary" />
              Reviewer Performance
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {reviewerList.length > 0 ? (
                reviewerList.map((rev, index) => (
                  <div key={rev.name} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground">{rev.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">
                        {rev.reviewsWeek} <span className="text-[10px] font-normal text-muted-foreground">reviews</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.floor(rev.avgTimeSeconds / 60)}m {rev.avgTimeSeconds % 60}s avg
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">No reviewer data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Queue Size Trend */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col h-[380px] lg:col-span-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <ShuffleIcon className="w-4 h-4" />
            Pending Queue Size (Last 7 Days)
          </h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={queueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" className="opacity-50" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)'
                  }}
                  itemStyle={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-warning)' }}
                  formatter={(value: any) => value}
                />
                <Line
                  type="monotone"
                  dataKey="pendingReviews"
                  stroke="var(--color-warning)"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: 'var(--color-card)' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}