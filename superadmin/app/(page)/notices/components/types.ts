export type NoticeType = 'announcement' | 'update' | 'warning' | 'maintenance' | 'promotion' | 'policy';
export type NoticePriority = 'low' | 'medium' | 'high' | 'urgent';
export type NoticeStatus = 'draft' | 'scheduled' | 'sent' | 'archived';
export type RecipientType = 'all_sellers' | 'individual_seller' | 'all_shops' | 'individual_shop';

export interface Recipient {
  id: string;
  name: string;
  email: string;
  type: 'seller' | 'shop';
  avatar?: string;
  shopName?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: NoticeType;
  priority: NoticePriority;
  status: NoticeStatus;
  recipientType: RecipientType;
  recipients: Recipient[];
  recipientCount: number;
  readCount: number;
  createdAt: string;
  scheduledAt?: string;
  sentAt?: string;
  expiresAt?: string;
  attachments?: { name: string; url: string; size: string }[];
  createdBy: string;
}

export interface NoticeStats {
  totalNotices: number;
  sentNotices: number;
  scheduledNotices: number;
  draftNotices: number;
  totalRecipients: number;
  avgReadRate: number;
}
