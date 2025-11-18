'use client'

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2, Copy, TrendingUp } from 'lucide-react'

const CouponsView = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const coupons = [
    {
      id: 1,
      code: 'WELCOME20',
      description: 'Welcome discount for new users',
      discountType: 'percentage',
      discountValue: 20,
      minPurchase: 50,
      maxDiscount: 100,
      usageCount: 342,
      usageLimit: 1000,
      expiryDate: '2024-12-31',
      status: 'active'
    },
    {
      id: 2,
      code: 'FLASH50',
      description: 'Flash sale special offer',
      discountType: 'percentage',
      discountValue: 50,
      minPurchase: 100,
      maxDiscount: 200,
      usageCount: 156,
      usageLimit: 500,
      expiryDate: '2024-06-30',
      status: 'active'
    },
    {
      id: 3,
      code: 'FLAT15',
      description: 'Flat $15 off on orders',
      discountType: 'fixed',
      discountValue: 15,
      minPurchase: 75,
      maxDiscount: 15,
      usageCount: 89,
      usageLimit: 200,
      expiryDate: '2024-08-15',
      status: 'active'
    },
    {
      id: 4,
      code: 'SUMMER30',
      description: 'Summer sale discount',
      discountType: 'percentage',
      discountValue: 30,
      minPurchase: 80,
      maxDiscount: 150,
      usageCount: 234,
      usageLimit: 800,
      expiryDate: '2024-07-31',
      status: 'active'
    },
    {
      id: 5,
      code: 'FREESHIP',
      description: 'Free shipping on all orders',
      discountType: 'fixed',
      discountValue: 10,
      minPurchase: 30,
      maxDiscount: 10,
      usageCount: 567,
      usageLimit: 2000,
      expiryDate: '2024-12-31',
      status: 'active'
    },
    {
      id: 6,
      code: 'SPECIAL25',
      description: 'Special occasion discount',
      discountType: 'percentage',
      discountValue: 25,
      minPurchase: 60,
      maxDiscount: 120,
      usageCount: 445,
      usageLimit: 1000,
      expiryDate: '2024-09-30',
      status: 'active'
    },
    {
      id: 7,
      code: 'NEWYEAR40',
      description: 'New year celebration offer',
      discountType: 'percentage',
      discountValue: 40,
      minPurchase: 120,
      maxDiscount: 180,
      usageCount: 823,
      usageLimit: 1500,
      expiryDate: '2024-01-31',
      status: 'expired'
    },
    {
      id: 8,
      code: 'WEEKEND10',
      description: 'Weekend special discount',
      discountType: 'fixed',
      discountValue: 10,
      minPurchase: 40,
      maxDiscount: 10,
      usageCount: 178,
      usageLimit: 500,
      expiryDate: '2024-05-31',
      status: 'inactive'
    }
  ]

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Coupons</h2>
          <p className="text-sm text-slate-600 mt-0.5">Manage discount coupons and promotional codes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search coupons by code or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Code</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Discount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Min Purchase</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Usage</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Expiry</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-orange-600 text-sm">{coupon.code}</span>
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-600 text-sm">{coupon.description}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-900 text-sm">
                      {coupon.discountType === 'percentage'
                        ? `${coupon.discountValue}% off`
                        : `$${coupon.discountValue} off`}
                    </span>
                    {coupon.discountType === 'percentage' && (
                      <span className="text-xs text-slate-500 block">Max: ${coupon.maxDiscount}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-900 text-sm">${coupon.minPurchase}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-slate-600">
                            {coupon.usageCount}/{coupon.usageLimit}
                          </span>
                        </div>
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${(coupon.usageCount / coupon.usageLimit) * 100}%` }}
                          />
                        </div>
                      </div>
                      <TrendingUp className="w-3 h-3 text-slate-400" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-600 text-sm">{coupon.expiryDate}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : coupon.status === 'expired'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                       <button className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                            <Edit className="w-4 h-4" />
                                          </button>
                                          <button className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCoupons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">No coupons found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CouponsView
