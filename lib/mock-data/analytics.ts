import { 
  MatchRateData, 
  MatchMethodDistribution, 
  ConfidenceHistogramData,
  FacilityDataQuality,
  QualityTrendData,
  PatientsPerFacility,
  NewPatientsData,
  CountyDistribution,
  QueueSizeTrend,
  AnalyticsMetrics
} from '@/types/analytics';

export const mockMatchRateData: MatchRateData[] = [
  { date: 'Mon', autoMatched: 82, manualMatched: 10, unmatched: 8 },
  { date: 'Tue', autoMatched: 85, manualMatched: 8, unmatched: 7 },
  { date: 'Wed', autoMatched: 81, manualMatched: 12, unmatched: 7 },
  { date: 'Thu', autoMatched: 88, manualMatched: 7, unmatched: 5 },
  { date: 'Fri', autoMatched: 83, manualMatched: 9, unmatched: 8 },
  { date: 'Sat', autoMatched: 90, manualMatched: 6, unmatched: 4 },
  { date: 'Sun', autoMatched: 87, manualMatched: 8, unmatched: 5 },
];

export const mockMatchMethodDistribution: MatchMethodDistribution[] = [
  { name: 'Auto (National ID)', value: 45, color: '#10B981' }, // success
  { name: 'Auto (Probabilistic)', value: 35, color: '#00BFA5' }, // accent
  { name: 'Auto (Phone)', value: 12, color: '#1A73B8' }, // primary-mid
  { name: 'Manual', value: 5, color: '#0F4C81' }, // primary
  { name: 'Pending', value: 2, color: '#F59E0B' }, // warning
  { name: 'Unmatched', value: 1, color: '#9CA3AF' }, // gray
];

export const mockConfidenceHistogram: ConfidenceHistogramData[] = [
  { range: '<0.50', count: 120 },
  { range: '0.50-0.59', count: 250 },
  { range: '0.60-0.69', count: 450 },
  { range: '0.70-0.79', count: 980 },
  { range: '0.80-0.89', count: 1540 }, // High manual review
  { range: '0.90-0.94', count: 2800 }, 
  { range: '0.95-0.99', count: 5400 }, // Auto match range
  { range: '1.00', count: 8900 },      // Exact match (NID)
];

export const mockFacilityDataQuality: FacilityDataQuality[] = [
  { facility: 'KNH', nationalId: 88, phone: 95, both: 85 },
  { facility: 'Nairobi West', nationalId: 75, phone: 90, both: 70 },
  { facility: 'Aga Khan', nationalId: 92, phone: 98, both: 91 },
  { facility: 'Coast Gen', nationalId: 65, phone: 82, both: 60 },
  { facility: 'Eldoret Ref', nationalId: 70, phone: 85, both: 68 },
];

export const mockQualityTrend: QualityTrendData[] = [
  { date: 'Oct', score: 72 },
  { date: 'Nov', score: 75 },
  { date: 'Dec', score: 81 },
  { date: 'Jan', score: 83 },
  { date: 'Feb', score: 85 },
  { date: 'Mar', score: 87 },
];

export const mockPatientsPerFacility: PatientsPerFacility[] = [
  { facility: 'KNH', patients: 350000 },
  { facility: 'Aga Khan', patients: 120000 },
  { facility: 'Kenyatta Univ', patients: 95000 },
  { facility: 'Moi Teaching', patients: 85000 },
  { facility: 'Nairobi West', patients: 65000 },
  { facility: 'Coast Gen', patients: 45000 },
];

export const mockNewPatients: NewPatientsData[] = [
  { date: '01', sourceRecords: 1200, masterPatients: 180 },
  { date: '02', sourceRecords: 1100, masterPatients: 150 },
  { date: '03', sourceRecords: 1350, masterPatients: 210 },
  { date: '04', sourceRecords: 900, masterPatients: 120 },
  { date: '05', sourceRecords: 1400, masterPatients: 230 },
  { date: '06', sourceRecords: 1600, masterPatients: 280 },
  { date: '07', sourceRecords: 1800, masterPatients: 310 },
];

export const mockCountyDistribution: CountyDistribution[] = [
  { county: 'Nairobi', patients: 450200 },
  { county: 'Kiambu', patients: 180400 },
  { county: 'Mombasa', patients: 125000 },
  { county: 'Nakuru', patients: 98000 },
  { county: 'Uasin Gishu', patients: 85000 },
  { county: 'Kisumu', patients: 78000 },
];

export const mockQueueSizeTrend: QueueSizeTrend[] = [
  { date: 'Mon', pendingReviews: 450 },
  { date: 'Tue', pendingReviews: 380 },
  { date: 'Wed', pendingReviews: 420 },
  { date: 'Thu', pendingReviews: 310 },
  { date: 'Fri', pendingReviews: 240 },
  { date: 'Sat', pendingReviews: 210 },
  { date: 'Sun', pendingReviews: 234 },
];

export const mockAnalyticsMetrics: AnalyticsMetrics = {
  duplicateRateEstimate: 1.8, // 1.8%
  avgReviewTimeMinutes: 4.2,
  reviewerPerformance: [
    { name: 'Dr. Sarah K.', reviewsWeek: 450, avgTimeSeconds: 185 },
    { name: 'James M.', reviewsWeek: 380, avgTimeSeconds: 210 },
    { name: 'Dr. Ali R.', reviewsWeek: 310, avgTimeSeconds: 245 },
    { name: 'Grace W.', reviewsWeek: 290, avgTimeSeconds: 195 },
  ]
};
