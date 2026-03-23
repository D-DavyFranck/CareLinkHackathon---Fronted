export interface MatchRateData {
  date: string;
  autoMatched: number;
  manualMatched: number;
  unmatched: number;
}

export interface MatchMethodDistribution {
  name: string;
  value: number;
  color: string;
}

export interface ConfidenceHistogramData {
  range: string;
  count: number;
}

export interface FacilityDataQuality {
  facility: string;
  nationalId: number;
  phone: number;
  both: number;
}

export interface QualityTrendData {
  date: string;
  score: number;
}

export interface PatientsPerFacility {
  facility: string;
  patients: number;
}

export interface NewPatientsData {
  date: string;
  sourceRecords: number;
  masterPatients: number;
}

export interface CountyDistribution {
  county: string;
  patients: number;
}

export interface QueueSizeTrend {
  date: string;
  pendingReviews: number;
}

export interface AnalyticsMetrics {
  duplicateRateEstimate: number;
  avgReviewTimeMinutes: number;
  reviewerPerformance: {
    name: string;
    reviewsWeek: number;
    avgTimeSeconds: number;
  }[];
}
