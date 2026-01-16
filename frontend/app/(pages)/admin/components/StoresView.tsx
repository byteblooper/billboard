'use client'

import React, { useState } from 'react'
import { Plus, Search, Eye, Edit, Trash2, MapPin, Star, ShoppingBag } from 'lucide-react'

const demoStores = [
  { id: 1, name: 'TechHub Electronics', category: 'Electronics', location: '123 Main St, New York', rating: 4.8, products: 156, sales: 2345, status: 'active', verified: true },
  { id: 2, name: 'Fashion Avenue', category: 'Fashion', location: '456 Oak Ave, Los Angeles', rating: 4.9, products: 234, sales: 3456, status: 'active', verified: true },
  { id: 3, name: 'Style Corner', category: 'Fashion', location: '789 Pine Rd, Chicago', rating: 4.6, products: 189, sales: 1567, status: 'active', verified: false },
  { id: 4, name: 'Sports Galaxy', category: 'Sports', location: '321 Elm St, Houston', rating: 4.7, products: 145, sales: 1890, status: 'active', verified: true },
  { id: 5, name: 'Home Essentials', category: 'Home & Garden', location: '654 Maple Dr, Phoenix', rating: 4.5, products: 267, sales: 2134, status: 'active', verified: true },
  { id: 6, name: 'Book Nook', category: 'Books', location: '987 Cedar Ln, Philadelphia', rating: 4.9, products: 523, sales: 987, status: 'inactive', verified: false },
  { id: 7, name: 'Gadget World', category: 'Electronics', location: '147 Birch St, San Antonio', rating: 4.6, products: 198, sales: 1456, status: 'active', verified: true },
  { id: 8, name: 'Pet Paradise', category: 'Pets', location: '258 Spruce Ave, San Diego', rating: 4.8, products: 312, sales: 1789, status: 'active', verified: true }
]

const StoresView = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStores = demoStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Stores Management</h2>
          <button className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-violet-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-1 sm:gap-2">
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add Store</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="sm:hidden divide-y divide-gray-200">
        {filteredStores.map((store) => (
          <div key={store.id} className="p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900 text-sm">{store.name}</span>
                {store.verified && (
                  <span className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-[10px] font-medium">✓</span>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-2">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{store.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-gray-900">{store.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <ShoppingBag className="w-3 h-3" />
                  {store.products}
                </div>
                <span className="text-gray-500">{store.sales} sales</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                store.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Store</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Category</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Location</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Rating</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Products</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Sales</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Status</th>
              <th className="text-right p-4 text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">{store.name}</span>
                    {store.verified && (
                      <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium">✓</span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{store.category}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {store.location}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{store.rating}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {store.products}
                  </div>
                </td>
                <td className="p-4 text-sm font-medium text-gray-900">{store.sales}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    store.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredStores.length === 0 && (
        <div className="p-6 sm:p-8 text-center text-gray-500">
          <p className="text-sm">No stores found</p>
        </div>
      )}
    </div>
  )
}

export default StoresView
