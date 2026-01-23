'use client';

import { useState, useMemo } from 'react';
import {
  Campaign,
  CampaignStatus,
  Coupon,
  Banner,
  FeaturedItem,
  NotificationCampaign,
  HomepageSection,
} from './components/types';
import {
  demoCampaigns,
  demoCoupons,
  demoBanners,
  demoFeaturedItems,
  demoNotifications,
  demoHomepageSections,
  calculatePromotionStats,
} from './components/demoData';
import {
  CampaignList,
  CampaignModal,
  CouponList,
  CouponModal,
  BannerManager,
  BannerModal,
  FeaturedControl,
  NotificationList,
  NotificationModal,
  HomepageControl,
  PromotionStatsCard,
} from './components';

type ViewTab = 'campaigns' | 'coupons' | 'banners' | 'featured' | 'notifications' | 'homepage';

export default function SponsoresPage() {
  // State for all data
  const [campaigns, setCampaigns] = useState<Campaign[]>(demoCampaigns);
  const [coupons, setCoupons] = useState<Coupon[]>(demoCoupons);
  const [banners, setBanners] = useState<Banner[]>(demoBanners);
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>(demoFeaturedItems);
  const [notifications, setNotifications] = useState<NotificationCampaign[]>(demoNotifications);
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>(demoHomepageSections);

  // UI State
  const [activeTab, setActiveTab] = useState<ViewTab>('campaigns');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<NotificationCampaign | null>(null);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Stats
  const stats = useMemo(
    () => calculatePromotionStats(campaigns, coupons, banners, featuredItems, notifications),
    [campaigns, coupons, banners, featuredItems, notifications]
  );

  // Filtered data
  const filteredCampaigns = useMemo(() => {
    if (!searchQuery) return campaigns;
    return campaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [campaigns, searchQuery]);

  const filteredCoupons = useMemo(() => {
    if (!searchQuery) return coupons;
    return coupons.filter(
      (c) =>
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [coupons, searchQuery]);

  // Campaign Handlers
  const handleSaveCampaign = (campaignData: Partial<Campaign>) => {
    if (campaignData.id) {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaignData.id ? { ...c, ...campaignData, updatedAt: new Date().toISOString() } : c))
      );
    } else {
      const newCampaign: Campaign = {
        id: `camp-${Date.now()}`,
        name: campaignData.name || '',
        type: campaignData.type || 'flash_sale',
        status: 'draft',
        description: campaignData.description || '',
        discountPercentage: campaignData.discountPercentage,
        minPurchase: campaignData.minPurchase,
        maxDiscount: campaignData.maxDiscount,
        budget: campaignData.budget,
        startDate: campaignData.startDate || new Date().toISOString(),
        endDate: campaignData.endDate || new Date().toISOString(),
        targetProducts: [],
        targetCategories: [],
        targetSellers: [],
        usedBudget: 0,
        totalOrders: 0,
        totalRevenue: 0,
        bannerImage: campaignData.bannerImage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCampaigns((prev) => [newCampaign, ...prev]);
    }
  };

  const handleToggleCampaignStatus = (campaignId: string, newStatus: CampaignStatus) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, status: newStatus, updatedAt: new Date().toISOString() } : c))
    );
  };

  // Coupon Handlers
  const handleSaveCoupon = (couponData: Partial<Coupon>) => {
    if (couponData.id) {
      setCoupons((prev) => prev.map((c) => (c.id === couponData.id ? { ...c, ...couponData } : c)));
    } else {
      const newCoupon: Coupon = {
        id: `coup-${Date.now()}`,
        code: couponData.code || '',
        type: couponData.type || 'percentage',
        scope: couponData.scope || 'global',
        value: couponData.value || 0,
        minPurchase: couponData.minPurchase || 0,
        maxDiscount: couponData.maxDiscount,
        usageLimit: couponData.usageLimit || 1000,
        usedCount: 0,
        perUserLimit: couponData.perUserLimit || 1,
        sellerId: couponData.sellerId,
        sellerName: couponData.sellerName,
        categoryId: couponData.categoryId,
        categoryName: couponData.categoryName,
        isActive: true,
        startDate: couponData.startDate || new Date().toISOString(),
        endDate: couponData.endDate || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        description: couponData.description,
      };
      setCoupons((prev) => [newCoupon, ...prev]);
    }
  };

  const handleToggleCoupon = (couponId: string) => {
    setCoupons((prev) => prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c)));
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
  };

  // Banner Handlers
  const handleSaveBanner = (bannerData: Partial<Banner>) => {
    if (bannerData.id) {
      setBanners((prev) => prev.map((b) => (b.id === bannerData.id ? { ...b, ...bannerData } : b)));
    } else {
      const newBanner: Banner = {
        id: `ban-${Date.now()}`,
        title: bannerData.title || '',
        subtitle: bannerData.subtitle,
        imageUrl: bannerData.imageUrl || '',
        mobileImageUrl: bannerData.mobileImageUrl,
        linkUrl: bannerData.linkUrl,
        position: bannerData.position || 'hero',
        priority: bannerData.priority || 1,
        isActive: true,
        startDate: bannerData.startDate || new Date().toISOString(),
        endDate: bannerData.endDate || new Date().toISOString(),
        clicks: 0,
        impressions: 0,
        targetAudience: bannerData.targetAudience,
        createdAt: new Date().toISOString(),
      };
      setBanners((prev) => [newBanner, ...prev]);
    }
  };

  const handleToggleBanner = (bannerId: string) => {
    setBanners((prev) => prev.map((b) => (b.id === bannerId ? { ...b, isActive: !b.isActive } : b)));
  };

  const handleDeleteBanner = (bannerId: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== bannerId));
  };

  const handleReorderBanner = (bannerId: string, direction: 'up' | 'down') => {
    setBanners((prev) => {
      const banner = prev.find((b) => b.id === bannerId);
      if (!banner) return prev;

      const samePossitonBanners = prev.filter((b) => b.position === banner.position);
      const newPriority = direction === 'up' ? banner.priority - 1 : banner.priority + 1;

      return prev.map((b) => {
        if (b.id === bannerId) return { ...b, priority: newPriority };
        if (b.position === banner.position && b.priority === newPriority) return { ...b, priority: banner.priority };
        return b;
      });
    });
  };

  // Featured Items Handlers
  const handleApproveFeatured = (itemId: string) => {
    setFeaturedItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status: 'active' } : item))
    );
  };

  const handleRejectFeatured = (itemId: string) => {
    setFeaturedItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status: 'rejected' } : item))
    );
  };

  const handleRemoveFeatured = (itemId: string) => {
    setFeaturedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleReorderFeatured = (itemId: string, direction: 'up' | 'down') => {
    setFeaturedItems((prev) => {
      const item = prev.find((i) => i.id === itemId);
      if (!item) return prev;

      const sameTypeItems = prev.filter((i) => i.type === item.type);
      const newPosition = direction === 'up' ? item.position - 1 : item.position + 1;

      return prev.map((i) => {
        if (i.id === itemId) return { ...i, position: newPosition };
        if (i.type === item.type && i.position === newPosition) return { ...i, position: item.position };
        return i;
      });
    });
  };

  // Notification Handlers
  const handleSaveNotification = (notificationData: Partial<NotificationCampaign>) => {
    if (notificationData.id) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationData.id ? { ...n, ...notificationData } : n))
      );
    } else {
      const newNotification: NotificationCampaign = {
        id: `notif-${Date.now()}`,
        name: notificationData.name || '',
        type: notificationData.type || 'push',
        status: notificationData.status || 'draft',
        title: notificationData.title || '',
        body: notificationData.body || '',
        imageUrl: notificationData.imageUrl,
        actionUrl: notificationData.actionUrl,
        targetAudience: notificationData.targetAudience || 'all',
        customSegment: notificationData.customSegment,
        scheduledAt: notificationData.scheduledAt,
        totalRecipients: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }
  };

  const handleSendNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId
          ? {
              ...n,
              status: 'sent',
              sentAt: new Date().toISOString(),
              totalRecipients: Math.floor(Math.random() * 50000) + 10000,
              delivered: Math.floor(Math.random() * 45000) + 9000,
              opened: Math.floor(Math.random() * 20000) + 5000,
              clicked: Math.floor(Math.random() * 5000) + 1000,
            }
          : n
      )
    );
  };

  const handleCancelNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, status: 'draft', scheduledAt: undefined } : n))
    );
  };

  const handleDuplicateNotification = (notification: NotificationCampaign) => {
    const newNotification: NotificationCampaign = {
      ...notification,
      id: `notif-${Date.now()}`,
      name: `${notification.name} (Copy)`,
      status: 'draft',
      scheduledAt: undefined,
      sentAt: undefined,
      totalRecipients: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Homepage Section Handlers
  const handleToggleSection = (sectionId: string) => {
    setHomepageSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleReorderSection = (sectionId: string, direction: 'up' | 'down') => {
    setHomepageSections((prev) => {
      const section = prev.find((s) => s.id === sectionId);
      if (!section) return prev;

      const newPosition = direction === 'up' ? section.position - 1 : section.position + 1;

      return prev.map((s) => {
        if (s.id === sectionId) return { ...s, position: newPosition };
        if (s.position === newPosition) return { ...s, position: section.position };
        return s;
      });
    });
  };

  const tabs: { id: ViewTab; label: string; icon: string }[] = [
    { id: 'campaigns', label: 'Campaigns', icon: '🎯' },
    { id: 'coupons', label: 'Coupons', icon: '🎟️' },
    { id: 'banners', label: 'Banners', icon: '🖼️' },
    { id: 'featured', label: 'Featured', icon: '⭐' },
    { id: 'notifications', label: 'Notifications', icon: '📢' },
    { id: 'homepage', label: 'Homepage', icon: '🏠' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Promotions & Marketing</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage campaigns, coupons, banners, and marketing activities
          </p>
        </div>

        {/* Stats Cards */}
        <PromotionStatsCard stats={stats} />

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'campaigns' && (
              <button
                onClick={() => {
                  setSelectedCampaign(null);
                  setIsCampaignModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Campaign
              </button>
            )}
            {activeTab === 'coupons' && (
              <button
                onClick={() => {
                  setSelectedCoupon(null);
                  setIsCouponModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Coupon
              </button>
            )}
            {activeTab === 'banners' && (
              <button
                onClick={() => {
                  setSelectedBanner(null);
                  setIsBannerModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Banner
              </button>
            )}
            {activeTab === 'notifications' && (
              <button
                onClick={() => {
                  setSelectedNotification(null);
                  setIsNotificationModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Campaign
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'campaigns' && (
            <CampaignList
              campaigns={filteredCampaigns}
              onEdit={(campaign) => {
                setSelectedCampaign(campaign);
                setIsCampaignModalOpen(true);
              }}
              onToggleStatus={handleToggleCampaignStatus}
            />
          )}

          {activeTab === 'coupons' && (
            <CouponList
              coupons={filteredCoupons}
              onEdit={(coupon) => {
                setSelectedCoupon(coupon);
                setIsCouponModalOpen(true);
              }}
              onToggle={handleToggleCoupon}
              onDelete={handleDeleteCoupon}
            />
          )}

          {activeTab === 'banners' && (
            <BannerManager
              banners={banners}
              onEdit={(banner) => {
                setSelectedBanner(banner);
                setIsBannerModalOpen(true);
              }}
              onToggle={handleToggleBanner}
              onDelete={handleDeleteBanner}
              onReorder={handleReorderBanner}
            />
          )}

          {activeTab === 'featured' && (
            <FeaturedControl
              items={featuredItems}
              onApprove={handleApproveFeatured}
              onReject={handleRejectFeatured}
              onRemove={handleRemoveFeatured}
              onReorder={handleReorderFeatured}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationList
              notifications={notifications}
              onEdit={(notification) => {
                setSelectedNotification(notification);
                setIsNotificationModalOpen(true);
              }}
              onSend={handleSendNotification}
              onCancel={handleCancelNotification}
              onDuplicate={handleDuplicateNotification}
            />
          )}

          {activeTab === 'homepage' && (
            <HomepageControl
              sections={homepageSections}
              onToggle={handleToggleSection}
              onReorder={handleReorderSection}
              onEdit={(section) => {
                console.log('Edit section:', section);
              }}
            />
          )}
        </div>

        {/* Modals */}
        <CampaignModal
          campaign={selectedCampaign}
          isOpen={isCampaignModalOpen}
          onClose={() => {
            setIsCampaignModalOpen(false);
            setSelectedCampaign(null);
          }}
          onSave={handleSaveCampaign}
        />

        <CouponModal
          coupon={selectedCoupon}
          isOpen={isCouponModalOpen}
          onClose={() => {
            setIsCouponModalOpen(false);
            setSelectedCoupon(null);
          }}
          onSave={handleSaveCoupon}
        />

        <BannerModal
          banner={selectedBanner}
          isOpen={isBannerModalOpen}
          onClose={() => {
            setIsBannerModalOpen(false);
            setSelectedBanner(null);
          }}
          onSave={handleSaveBanner}
        />

        <NotificationModal
          notification={selectedNotification}
          isOpen={isNotificationModalOpen}
          onClose={() => {
            setIsNotificationModalOpen(false);
            setSelectedNotification(null);
          }}
          onSave={handleSaveNotification}
        />
      </div>
    </div>
  );
}
