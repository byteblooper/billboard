export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

export interface CategorySales {
  id: string;
  name: string;
  icon: string;
  totalSales: number;
  totalOrders: number;
  growth: number;
  avgOrderValue: number;
  topProduct: string;
  color: string;
}

export interface SellerRanking {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  shopName: string;
  avatar?: string;
  totalSales: number;
  totalOrders: number;
  rating: number;
  growth: number;
  conversionRate: number;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface ChurnData {
  period: string;
  activeUsers: number;
  churnedUsers: number;
  churnRate: number;
  newUsers: number;
  netGrowth: number;
}

export interface ChurnReason {
  reason: string;
  count: number;
  percentage: number;
}

export interface HighRiskSeller {
  id: string;
  name: string;
  shopName: string;
  avatar?: string;
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium';
  riskFactors: string[];
  lastOrderDate: string;
  salesTrend: number;
  complaintRate: number;
  returnRate: number;
  recommendation: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  dropoffRate: number;
  avgTimeSpent: string;
}

export interface FunnelData {
  totalViews: number;
  addedToCart: number;
  checkoutInitiated: number;
  ordersCompleted: number;
  conversionRate: number;
  cartAbandonmentRate: number;
  checkoutAbandonmentRate: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  activeUsers: number;
  usersGrowth: number;
  avgOrderValue: number;
  aovGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  churnRate: number;
  churnChange: number;
}
