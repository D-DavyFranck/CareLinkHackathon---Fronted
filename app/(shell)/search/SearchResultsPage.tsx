'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { performSearch } from '@/lib/mock-data/search';
import { SearchResult } from '@/types/search';
import { MagnifyingGlassIcon, PersonIcon, HeartIcon, HomeIcon, DownloadIcon, Link1Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  
  const results = queryParam ? performSearch(queryParam) : [];
  const masterPatients = results.filter(r => r.type === 'MASTER');
  const sourceRecords = results.filter(r => r.type === 'SOURCE');
  const facilities = results.filter(r => r.type === 'FACILITY');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/search`);
    }
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1 max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Search Results</h1>
          <p className="text-muted-foreground">Find patients, source records, and facilities.</p>
          <form onSubmit={handleSearch} className="relative mt-4 flex items-center gap-3">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                className="pl-10 h-12 text-base bg-card border-primary/20 focus:border-primary shadow-sm"
                placeholder="Search by Name, MRI, Phone, or ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">Search</Button>
          </form>
        </div>
        <Button variant="outline" className="gap-2 bg-card">
          <DownloadIcon className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Filter By Type</h3>
            <div className="space-y-2">
              <FilterButton label="All Results" count={results.length} active={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} />
              <FilterButton label="Master Patients" count={masterPatients.length} active={activeFilter === 'MASTER'} onClick={() => setActiveFilter('MASTER')} />
              <FilterButton label="Source Records" count={sourceRecords.length} active={activeFilter === 'SOURCE'} onClick={() => setActiveFilter('SOURCE')} />
              <FilterButton label="Facilities" count={facilities.length} active={activeFilter === 'FACILITY'} onClick={() => setActiveFilter('FACILITY')} />
            </div>
            <Separator className="my-4" />
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Other Filters</h3>
            <p className="text-xs text-muted-foreground italic">Advanced filtering (Date, Status) coming soon.</p>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          {queryParam && results.length === 0 ? (
            <div className="p-12 text-center bg-card border border-border rounded-xl flex flex-col items-center gap-4">
              <MagnifyingGlassIcon className="w-12 h-12 text-muted-foreground opacity-50" />
              <div>
                <h3 className="text-lg font-bold">No exact matches found</h3>
                <p className="text-sm text-muted-foreground mt-1">We couldn&apos;t find any records matching &quot;{queryParam}&quot;.</p>
              </div>
              <Button variant="outline" onClick={() => { setQuery(''); router.push('/search'); }}>Clear Search</Button>
            </div>
          ) : !queryParam ? (
            <div className="p-12 text-center bg-card border border-border rounded-xl border-dashed">
              <p className="text-muted-foreground">Enter a search query above to begin.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {(activeFilter === 'ALL' || activeFilter === 'MASTER') && masterPatients.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <PersonIcon className="w-5 h-5 text-primary" /> Master Patients
                  </h2>
                  <div className="grid gap-3">
                    {masterPatients.map(patient => (
                      <ResultCard key={patient.id} result={patient} onClick={() => router.push(`/patients/${patient.mpiId}`)} />
                    ))}
                  </div>
                </div>
              )}
              {(activeFilter === 'ALL' || activeFilter === 'SOURCE') && sourceRecords.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Link1Icon className="w-5 h-5 text-accent" /> Source Records
                  </h2>
                  <div className="grid gap-3">
                    {sourceRecords.map(record => (
                      <ResultCard key={record.id} result={record} onClick={() => router.push(`/patients/${record.mpiId}`)} />
                    ))}
                  </div>
                </div>
              )}
              {(activeFilter === 'ALL' || activeFilter === 'FACILITY') && facilities.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <HomeIcon className="w-5 h-5 text-blue-500" /> Facilities
                  </h2>
                  <div className="grid gap-3">
                    {facilities.map(facility => (
                      <ResultCard key={facility.id} result={facility} onClick={() => {}} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterButton({ label, count, active, onClick }: { label: string, count: number, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${active ? 'bg-primary/10 text-primary font-bold' : 'text-foreground hover:bg-muted font-medium'}`}
    >
      <span>{label}</span>
      <Badge variant="secondary" className={active ? 'bg-primary/20 text-primary' : 'bg-muted-foreground/10 text-muted-foreground'}>
        {count}
      </Badge>
    </button>
  );
}

function ResultCard({ result, onClick }: { result: SearchResult, onClick: () => void }) {
  const isMaster = result.type === 'MASTER';
  const isFacility = result.type === 'FACILITY';

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border p-4 rounded-xl flex items-start gap-4 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isMaster ? 'bg-primary/10 text-primary' : isFacility ? 'bg-blue-50 text-blue-500' : 'bg-secondary text-muted-foreground'}`}>
        {isMaster ? <PersonIcon className="w-5 h-5" /> : isFacility ? <HomeIcon className="w-5 h-5" /> : <span className="text-[10px] font-bold">HMIS</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{result.title}</h4>
            <p className="text-sm text-muted-foreground mt-0.5">{result.subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline" className={`text-[10px] ${isMaster ? 'bg-primary/5 text-primary border-primary/20' : isFacility ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-secondary text-muted-foreground border-border'}`}>
              {result.id}
            </Badge>
            {result.confidence && (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                {result.confidence}% Match
              </span>
            )}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
          <HeartIcon className={`w-3.5 h-3.5 ${isMaster ? 'text-emerald-500' : isFacility ? 'text-blue-500' : 'text-accent'}`} />
          <span className={`text-xs font-medium ${isMaster ? 'text-emerald-600' : isFacility ? 'text-blue-600' : 'text-accent'}`}>
            {result.matchSignal}
          </span>
        </div>
      </div>
    </div>
  );
}