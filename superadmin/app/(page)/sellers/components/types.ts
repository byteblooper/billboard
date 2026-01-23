export type SellerStatus = 'verified' | 'unverified' | 'suspended' | 'rejected';
export type SellerTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type PenaltyType = 'warning' | 'fine' | 'temporary_ban' | 'permanent_ban';
export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface Document {
  id: string;
  type: 'trade_license' | 'nid' | 'tax_certificate' | 'bank_statement' | 'other';
  name: string;
  url: string;
  status: DocumentStatus;
  uploadedAt: string;
  expiryDate?: string;
}

export interface Penalty {
  id: string;
  type: PenaltyType;
  reason: string;
  amount?: number;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdBy: string;
}

export interface PerformanceMetrics {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  rating: number;
  reviewCount: number;
  cancellationRate: number;
  responseTime: number; // in hours
  onTimeDeliveryRate: number;
}

export interface BusinessInfo {
  businessName: string;
  businessType: string;
  registrationNumber: string;
  taxId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  establishedYear: number;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: SellerStatus;
  tier: SellerTier;
  businessInfo: BusinessInfo;
  documents: Document[];
  performance: PerformanceMetrics;
  penalties: Penalty[];
  createdAt: string;
  lastActive: string;
  totalRevenue: number;
  balance: number;
}
