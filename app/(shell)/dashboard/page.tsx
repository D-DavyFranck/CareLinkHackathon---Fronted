'use client';

import React from 'react';
import { KPICards } from '@/components/dashboard/KPICards';
import { IngestionTrendChart } from '@/components/dashboard/IngestionTrendChart';
import { MatchStatusDonut } from '@/components/dashboard/MatchStatusDonut';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { FacilitySyncStatus } from '@/components/dashboard/FacilitySyncStatus';
import { motion } from 'motion/react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* KPI Section */}
      <KPICards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3"
        >
          <IngestionTrendChart />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <MatchStatusDonut />
        </motion.div>
      </div>

      {/* Panels Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-3"
        >
          <ActivityFeed />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <FacilitySyncStatus />
        </motion.div>
      </div>
    </div>
  );
}
