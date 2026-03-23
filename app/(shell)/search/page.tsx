import { Suspense } from 'react';
import SearchResultsPage from './SearchResultsPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-muted-foreground">Loading search...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
}