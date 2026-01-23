export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'frozen' | 'failed' | 'stuck';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
export type RefundStatus = 'requested' | 'processing' | 'approved' | 'rejected' | 'completed';
export type ReturnStatus = 'requested' | 'approved' | 'rejected' | 'received' | 'completed';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderTimeline {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  actor?: string;
}

export interface RefundRequest {
  id: string;
  orderId: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  requestedAt: string;
  processedAt?: string;
  processedBy?: string;
  notes?: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  items: { productId: string; productName: string; quantity: number; reason: string }[];
  status: ReturnStatus;
  requestedAt: string;
  processedAt?: string;
  trackingNumber?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shopId: string;
  shopName: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  shippingAddress: {
    address: string;
    city: string;
    area: string;
    zipCode: string;
  };
  timeline: OrderTimeline[];
  refundRequest?: RefundRequest;
  returnRequest?: ReturnRequest;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  estimatedDelivery?: string;
  failureReason?: string;
  stuckReason?: string;
}

export interface PaymentAnalytics {
  totalOrders: number;
  totalRevenue: number;
  codOrders: number;
  codRevenue: number;
  onlineOrders: number;
  onlineRevenue: number;
  codPercentage: number;
  onlinePercentage: number;
  averageOrderValue: number;
  paymentMethodBreakdown: { method: PaymentMethod; count: number; revenue: number }[];
}
