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
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="font-semibold text-slate-900">Stores Management</h2>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Store
          </button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Store</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Category</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Location</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Rating</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Products</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Sales</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Status</th>
              <th className="text-right p-4 text-xs font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredStores.map((store) => (
              <tr key={store.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 text-sm">{store.name}</span>
                    {store.verified && (
                      <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium">✓</span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-600">{store.category}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <MapPin className="w-3 h-3" />
                    {store.location}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium text-slate-900">{store.rating}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {store.products}
                  </div>
                </td>
                <td className="p-4 text-sm font-medium text-slate-900">{store.sales}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    store.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
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
      
      {filteredStores.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          <p>No stores found</p>
        </div>
      )}
    </div>
  )
}

export default StoresView
