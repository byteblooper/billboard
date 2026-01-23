export type ShopStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type ShopCategory = 'electronics' | 'fashion' | 'grocery' | 'beauty' | 'sports' | 'home' | 'books' | 'other';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  category: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt: string;
}

export interface SalesData {
  date: string;
  orders: number;
  revenue: number;
}

export interface ShopMetrics {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageOrderValue: number;
  rating: number;
  reviewCount: number;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  category: ShopCategory;
  status: ShopStatus;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  products: Product[];
  metrics: ShopMetrics;
  salesHistory: SalesData[];
  requestedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}

export interface ShopRequest {
  id: string;
  shopName: string;
  description: string;
  category: ShopCategory;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  businessAddress: string;
  city: string;
  documents: {
    id: string;
    type: string;
    name: string;
    url: string;
  }[];
  requestedAt: string;
  status: ShopStatus;
}
