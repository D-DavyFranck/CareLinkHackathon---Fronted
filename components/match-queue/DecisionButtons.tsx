'use client';

import React, { useState } from 'react';
import { Check, X, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useMatchQueueStore } from '@/lib/store/useMatchQueueStore';

interface DecisionButtonsProps {
  itemId: string;
  masterId: string;
}

export function DecisionButtons({ itemId, masterId }: DecisionButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { removeItem, updateItemStatus } = useMatchQueueStore();

  const handleConfirm = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`Records linked — ${masterId} updated`);
    removeItem(itemId);
    setIsLoading(false);
  };

  const handleReject = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("New master patient created");
    removeItem(itemId);
    setIsLoading(false);
  };

  const handleEscalate = () => {
    toast.info("Escalated to IPRS verification queue");
    updateItemStatus(itemId, 'IPRS_PENDING');
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleConfirm}
        disabled={isLoading}
        className="w-full h-12 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
        Confirm — Link to {masterId}
      </button>

      <button
        onClick={handleReject}
        disabled={isLoading}
        className="w-full h-12 border-2 border-danger/40 text-danger font-bold rounded-xl hover:bg-danger hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5" />}
        Reject — Create New Master Record
      </button>

      <button
        onClick={handleEscalate}
        disabled={isLoading}
        className="w-full h-12 border-2 border-primary/40 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <ArrowRight className="w-5 h-5" />
        Escalate — Request IPRS Verification
      </button>

      <div className="text-[10px] text-gray-400 text-center mt-4 font-medium">
        C — Confirm match  |  R — Reject  |  E — Escalate  |  ↑↓ Navigate
      </div>
    </div>
  );
}
