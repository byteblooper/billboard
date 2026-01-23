export type TrendDirection = 'up' | 'down' | 'neutral';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type ApprovalType = 'seller' | 'product' | 'withdrawal';
export type DisputeStatus = 'pending' | 'in_progress' | 'resolved' | 'escalated';

export interface StatCard {
  label: string;
  value: number | string;
  change: number;
  trend: TrendDirection;
  icon: string;
  color: string;
}

export interface SellerStats {
  total: number;
  active: number;
  inactive: number;
  newToday: number;
  newThisWeek: number;
  newThisMonth: number;
  pendingApproval: number;
}

export interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  todayOrders: number;
  todayGrowth: number;
}

export interface RevenueStats {
  gmv: number;
  gmvGrowth: number;
  platformRevenue: number;
  revenueGrowth: number;
  commissionRate: number;
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
}

export interface PendingApproval {
  id: string;
  type: ApprovalType;
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
  priority: 'high' | 'medium' | 'low';
  amount?: number;
}

export interface Dispute {
  id: string;
  orderId: string;
  type: 'refund' | 'quality' | 'delivery' | 'fraud' | 'other';
  status: DisputeStatus;
  buyer: string;
  seller: string;
  amount: number;
  createdAt: string;
  description: string;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  source: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
}

export interface DashboardData {
  sellerStats: SellerStats;
  orderStats: OrderStats;
  revenueStats: RevenueStats;
  pendingApprovals: PendingApproval[];
  disputes: Dispute[];
  alerts: Alert[];
}
