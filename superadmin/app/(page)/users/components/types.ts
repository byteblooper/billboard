export type UserStatus = 'active' | 'inactive' | 'suspended' | 'banned';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  shopName: string;
  addedAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  shopName: string;
  inStock: boolean;
  addedAt: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  shopName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  deliveredAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: UserStatus;
  address: string;
  city: string;
  joinedAt: string;
  lastActiveAt: string;
  totalOrders: number;
  totalSpent: number;
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalRevenue: number;
  avgOrderValue: number;
  totalOrders: number;
}
