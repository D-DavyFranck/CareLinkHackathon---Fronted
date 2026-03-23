'use client';

import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useMatchStore } from '@/lib/stores/useMatchStore';
import { LayersIcon } from '@radix-ui/react-icons';

export function MatchTicker() {
  const previousCountRef = useRef<number | null>(null);
  const { fetchQueue } = useMatchStore();

  useEffect(() => {
    // Polling interval simulating a WebSocket connection
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/match-queue/count');
        const data = await res.json();
        
        const count = data.count as number;
        if (previousCountRef.current !== null && count > previousCountRef.current) {
           const newItems = count - previousCountRef.current;
           toast('New Patient Registration Event', {
              description: `A facility submitted a new record resulting in ${newItems} new Match Queue Review candidate(s).`,
              icon: <LayersIcon className="w-5 h-5 text-amber-500" />,
              action: {
                 label: 'View Queue',
                 onClick: () => window.location.href = '/match-queue'
              }
           });
           
           // Refresh the entire queue eagerly if we detected an active increase
           fetchQueue();
        }

        previousCountRef.current = count;
      } catch (err) {
         // Silently fail polling on error
      }
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [fetchQueue]);

  return null; // Headless component
}
