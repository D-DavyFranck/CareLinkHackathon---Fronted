'use client';

import { create } from 'zustand';
import { MatchQueueItem } from '@/types/matching';
import { mockMatchQueue } from '@/lib/mock-data/match-queue';

interface MatchQueueState {
  items: MatchQueueItem[];
  selectedItemId: string | null;
  setItems: (items: MatchQueueItem[]) => void;
  selectItem: (id: string) => void;
  removeItem: (id: string) => void;
  updateItemStatus: (id: string, status: MatchQueueItem['status']) => void;
  nextItem: () => void;
  prevItem: () => void;
}

export const useMatchQueueStore = create<MatchQueueState>((set, get) => ({
  items: mockMatchQueue,
  selectedItemId: mockMatchQueue[0]?.id || null,
  setItems: (items) => set({ items }),
  selectItem: (id) => set({ selectedItemId: id }),
  removeItem: (id) => {
    const { items, selectedItemId } = get();
    const newItems = items.filter(item => item.id !== id);
    let nextSelectedId = selectedItemId;
    
    if (selectedItemId === id) {
      const currentIndex = items.findIndex(item => item.id === id);
      const nextItem = items[currentIndex + 1] || items[currentIndex - 1];
      nextSelectedId = nextItem?.id || null;
    }
    
    set({ items: newItems, selectedItemId: nextSelectedId });
  },
  updateItemStatus: (id, status) => set((state) => ({
    items: state.items.map(item => item.id === id ? { ...item, status } : item)
  })),
  nextItem: () => {
    const { items, selectedItemId } = get();
    if (!selectedItemId) return;
    const currentIndex = items.findIndex(item => item.id === selectedItemId);
    const nextItem = items[currentIndex + 1];
    if (nextItem) set({ selectedItemId: nextItem.id });
  },
  prevItem: () => {
    const { items, selectedItemId } = get();
    if (!selectedItemId) return;
    const currentIndex = items.findIndex(item => item.id === selectedItemId);
    const prevItem = items[currentIndex - 1];
    if (prevItem) set({ selectedItemId: prevItem.id });
  }
}));
