'use client'

import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'

const demoProducts = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 149.99, stock: 45, status: 'active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
  { id: 2, name: 'Classic Leather Watch', category: 'Fashion', price: 89.99, stock: 23, status: 'active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  { id: 3, name: 'Designer Sunglasses', category: 'Fashion', price: 79.99, stock: 12, status: 'active', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop' },
  { id: 4, name: 'Running Shoes Pro', category: 'Sports', price: 119.99, stock: 0, status: 'out-of-stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
  { id: 5, name: 'Smart Watch Ultra', category: 'Electronics', price: 299.99, stock: 18, status: 'active', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&h=100&fit=crop' },
  { id: 6, name: 'Luxury Backpack', category: 'Fashion', price: 89.99, stock: 31, status: 'active', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop' },
  { id: 7, name: 'Bluetooth Speaker', category: 'Electronics', price: 59.99, stock: 67, status: 'active', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop' },
  { id: 8, name: 'Leather Wallet', category: 'Fashion', price: 39.99, stock: 5, status: 'low-stock', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop' }
]

const ProductsView = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = demoProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string, stock: number) => {
    if (status === 'out-of-stock') {
      return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">Out of Stock</span>
    }
    if (status === 'low-stock' || stock < 10) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">Low Stock</span>
    }
    return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Active</span>
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="font-semibold text-gray-900">Products Management</h2>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Product</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Category</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Price</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Stock</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Status</th>
              <th className="text-right p-4 text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium text-gray-900 text-sm">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{product.category}</td>
                <td className="p-4 text-sm font-semibold text-gray-900">${product.price}</td>
                <td className="p-4 text-sm text-gray-600">{product.stock}</td>
                <td className="p-4">{getStatusBadge(product.status, product.stock)}</td>
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
      
      {filteredProducts.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No products found</p>
        </div>
      )}
    </div>
  )
}

export default ProductsView
