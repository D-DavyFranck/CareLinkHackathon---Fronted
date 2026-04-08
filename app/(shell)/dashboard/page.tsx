'use client';

import React from 'react';
import { KPICards } from '@/components/dashboard/KPICards';
import { IngestionTrendChart } from '@/components/dashboard/IngestionTrendChart';
import { MatchStatusDonut } from '@/components/dashboard/MatchStatusDonut';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { FacilitySyncStatus } from '@/components/dashboard/FacilitySyncStatus';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* KPI Section */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <KPICards />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <IngestionTrendChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <MatchStatusDonut />
          </motion.div>
        </div>

        {/* Panels Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <ActivityFeed />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <FacilitySyncStatus />
          </motion.div>
        </div>
      </div>
    </div>
  );
}