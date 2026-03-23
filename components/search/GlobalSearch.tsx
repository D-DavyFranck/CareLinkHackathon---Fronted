'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, PersonIcon, HeartIcon, HomeIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { performSearch } from '@/lib/mock-data/search';
import { SearchResult } from '@/types/search';
import { motion, AnimatePresence } from 'motion/react';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Sarah Otieno', 'MPI-000124', 'KNH']);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim().length >= 2 ? performSearch(query) : [];

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (mpiId: string) => {
    if (!recentSearches.includes(mpiId)) {
      setRecentSearches(prev => [mpiId, ...prev].slice(0, 5));
    }
    setIsOpen(false);
    setQuery('');
    router.push(`/patients/${mpiId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim().length > 0) {
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev].slice(0, 5));
      }
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const masterPatients = results.filter(r => r.type === 'MASTER');
  const sourceRecords = results.filter(r => r.type === 'SOURCE');
  const facilities = results.filter(r => r.type === 'FACILITY');

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <MagnifyingGlassIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
      
      <input 
        ref={inputRef}
        type="text" 
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.trim().length >= 2) {
             setIsOpen(true);
          }
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search patients, ID, Phone... (Press /)" 
        className={`pl-10 pr-4 py-1.5 bg-secondary border text-sm w-72 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${isOpen ? 'border-primary shadow-sm rounded-t-xl rounded-b-none' : 'border-border rounded-lg focus:border-primary/50'}`}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 bg-card border border-border border-t-0 rounded-b-xl shadow-lg overflow-hidden z-50 flex flex-col max-h-[400px]"
          >
             {query.trim().length < 2 ? (
                <div className="p-2">
                   <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/30 mb-1 rounded-md">
                      Recent Searches
                   </div>
                   <ul>
                     {recentSearches.map((search, idx) => (
                       <li key={idx}>
                         <button 
                           onClick={() => {
                             setQuery(search);
                             inputRef.current?.focus();
                           }}
                           className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted/50 rounded-md transition-colors flex items-center gap-2"
                         >
                           <MagnifyingGlassIcon className="w-3 h-3 text-muted-foreground" />
                           {search}
                         </button>
                       </li>
                     ))}
                   </ul>
                </div>
             ) : results.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                    No results found for &quot;{query}&quot;. <br/>
                    <span className="text-xs">Press Enter to run full search.</span>
                </div>
             ) : (
                <div className="overflow-y-auto w-full">
                    
                    {/* Master Patients Group */}
                    {masterPatients.length > 0 && (
                        <div className="py-2">
                           <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/30">
                              Master Patients
                           </div>
                           <ul>
                              {masterPatients.map(result => (
                                 <li key={result.id}>
                                    <button 
                                        onClick={() => handleSelect(result.mpiId)}
                                        className="w-full text-left px-4 py-2 hover:bg-muted/50 transition-colors flex items-start gap-3 group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                           <PersonIcon className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                               <span className="text-sm font-semibold text-foreground truncate">{result.title}</span>
                                               <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{result.mpiId}</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground truncate">{result.subtitle}</div>
                                            {result.matchSignal && (
                                                <div className="text-[10px] text-emerald-600 mt-0.5 font-medium flex items-center gap-1">
                                                   <HeartIcon className="w-3 h-3" /> {result.matchSignal}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                 </li>
                              ))}
                           </ul>
                        </div>
                    )}

                    {/* Source Records Group */}
                    {sourceRecords.length > 0 && (
                        <div className="py-2 border-t border-border">
                           <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/30">
                              Source Records
                           </div>
                           <ul>
                              {sourceRecords.map(result => (
                                 <li key={result.id}>
                                    <button 
                                        onClick={() => handleSelect(result.mpiId)}
                                        className="w-full text-left px-4 py-2 hover:bg-muted/50 transition-colors flex items-start gap-3 group"
                                    >
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-muted-foreground bg-secondary group-hover:bg-foreground group-hover:text-background transition-colors">
                                            <span className="text-[10px] font-bold">HMIS</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                               <span className="text-sm font-medium text-foreground truncate">{result.title}</span>
                                               <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border">Source</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground truncate">{result.subtitle}</div>
                                            {result.matchSignal && (
                                                <div className="text-[10px] text-accent mt-0.5 font-medium">
                                                   ↳ Links to MPI: {result.matchSignal} ({result.confidence}%)
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                 </li>
                              ))}
                           </ul>
                        </div>
                    )}

                    {/* Facilities Group */}
                    {facilities.length > 0 && (
                        <div className="py-2 border-t border-border">
                           <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/30">
                              Facilities
                           </div>
                           <ul>
                              {facilities.map(result => (
                                 <li key={result.id}>
                                    <button 
                                        onClick={() => handleSelect(result.mpiId)}
                                        className="w-full text-left px-4 py-2 hover:bg-muted/50 transition-colors flex items-start gap-3 group"
                                    >
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <HomeIcon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                               <span className="text-sm font-medium text-foreground truncate">{result.title}</span>
                                               <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">Facility</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground truncate">{result.subtitle}</div>
                                            {result.matchSignal && (
                                                <div className="text-[10px] text-blue-500 mt-0.5 font-medium flex gap-1 items-center">
                                                   <CheckCircledIcon className="w-3 h-3"/> {result.matchSignal}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                 </li>
                              ))}
                           </ul>
                        </div>
                    )}
                </div>
             )}
             
             {/* Footer hint */}
             <div className="p-2 border-t border-border bg-muted/30 text-[10px] text-center text-muted-foreground">
                Press Esc to close • Click a result to open Unified Patient Profile
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
