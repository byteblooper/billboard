export type CampaignType = 'flash_sale' | 'mega_sale' | 'seasonal' | 'clearance' | 'bundle';
export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'ended' | 'cancelled';
export type CouponType = 'percentage' | 'fixed' | 'free_shipping' | 'buy_x_get_y';
export type CouponScope = 'global' | 'seller' | 'category' | 'product';
export type BannerPosition = 'hero' | 'sidebar' | 'popup' | 'footer' | 'category_top';
export type NotificationType = 'push' | 'email' | 'sms' | 'in_app';
export type NotificationStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
export type FeaturedStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'expired';

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  minPurchase?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  targetProducts: string[];
  targetCategories: string[];
  targetSellers: string[];
  budget?: number;
  usedBudget: number;
  totalOrders: number;
  totalRevenue: number;
  bannerImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  scope: CouponScope;
  value: number;
  minPurchase: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  sellerId?: string;
  sellerName?: string;
  categoryId?: string;
  categoryName?: string;
  productIds?: string[];
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  description?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl?: string;
  position: BannerPosition;
  priority: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
  targetAudience?: string;
  createdAt: string;
}

export interface FeaturedItem {
  id: string;
  type: 'seller' | 'product';
  itemId: string;
  itemName: string;
  itemImage: string;
  sellerName?: string;
  status: FeaturedStatus;
  position: number;
  startDate: string;
  endDate: string;
  fee: number;
  feePaid: boolean;
  impressions: number;
  clicks: number;
  createdAt: string;
}

export interface NotificationCampaign {
  id: string;
  name: string;
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  body: string;
  imageUrl?: string;
  actionUrl?: string;
  targetAudience: 'all' | 'active' | 'inactive' | 'new' | 'premium' | 'custom';
  customSegment?: string;
  scheduledAt?: string;
  sentAt?: string;
  totalRecipients: number;
  delivered: number;
  opened: number;
  clicked: number;
  createdAt: string;
}

export interface HomepageSection {
  id: string;
  name: string;
  type: 'banner_carousel' | 'featured_products' | 'featured_sellers' | 'categories' | 'deals' | 'custom';
  position: number;
  isActive: boolean;
  config: Record<string, unknown>;
}

export interface PromotionStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalCoupons: number;
  activeCoupons: number;
  totalBanners: number;
  activeBanners: number;
  featuredSellers: number;
  featuredProducts: number;
  pendingNotifications: number;
  sentNotifications: number;
  totalCouponUsage: number;
  totalDiscountGiven: number;
}
