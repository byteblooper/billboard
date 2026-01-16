'use client'

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const CategoriesView = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      slug: 'electronics',
      parent: null,
      description: 'Electronic devices and gadgets',
      productCount: 245,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop',
      status: 'active',
      subcategories: 12
    },
    {
      id: 2,
      name: 'Fashion',
      slug: 'fashion',
      parent: null,
      description: 'Clothing and accessories',
      productCount: 389,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop',
      status: 'active',
      subcategories: 18
    },
    {
      id: 3,
      name: 'Home & Garden',
      slug: 'home-garden',
      parent: null,
      description: 'Home decor and garden supplies',
      productCount: 167,
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop',
      status: 'active',
      subcategories: 8
    },
    {
      id: 4,
      name: 'Sports & Outdoors',
      slug: 'sports-outdoors',
      parent: null,
      description: 'Sports equipment and outdoor gear',
      productCount: 134,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop',
      status: 'active',
      subcategories: 15
    },
    {
      id: 5,
      name: 'Books & Media',
      slug: 'books-media',
      parent: null,
      description: 'Books, music, and entertainment',
      productCount: 298,
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop',
      status: 'active',
      subcategories: 6
    },
    {
      id: 6,
      name: 'Health & Beauty',
      slug: 'health-beauty',
      parent: null,
      description: 'Health products and beauty items',
      productCount: 223,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop',
      status: 'active',
      subcategories: 10
    },
    {
      id: 7,
      name: 'Toys & Games',
      slug: 'toys-games',
      parent: null,
      description: 'Toys and gaming products',
      productCount: 156,
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=100&h=100&fit=crop',
      status: 'active',
      subcategories: 9
    },
    {
      id: 8,
      name: 'Automotive',
      slug: 'automotive',
      parent: null,
      description: 'Car parts and accessories',
      productCount: 189,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=100&h=100&fit=crop',
      status: 'inactive',
      subcategories: 7
    }
  ]

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Categories</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Manage product categories and subcategories</p>
        </div>
        <button className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-xs sm:text-sm font-medium">
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add Category</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-xs sm:text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-gray-200">
          {filteredCategories.map((category) => (
            <div key={category.id} className="p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-violet-900 text-sm">{category.name}</h3>
                      <p className="text-[10px] text-violet-600 font-mono">{category.slug}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button className="p-1 text-violet-600 hover:text-violet-600 hover:bg-violet-50 rounded transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 text-violet-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 text-violet-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{category.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-violet-900 font-medium">{category.productCount} products</span>
                      <button className="flex items-center gap-0.5 text-violet-600 hover:text-violet-700 font-medium">
                        {category.subcategories} subcats
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-violet-100 text-violet-700'
                    }`}>
                      {category.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Slug</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Products</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Subcategories</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      <span className="font-medium text-violet-900 text-sm">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-violet-600 text-sm font-mono">{category.slug}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-violet-600 text-sm">{category.description}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-violet-900 font-medium text-sm">{category.productCount}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-violet-600 hover:text-violet-700 text-sm font-medium">
                      {category.subcategories}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-violet-100 text-violet-700'
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                     <button className="p-1.5 text-violet-600 hover:text-violet-600 hover:bg-violet-50 rounded transition-colors">
                                           <Eye className="w-4 h-4" />
                                         </button>
                      <button className="p-1.5 text-violet-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                           <Edit className="w-4 h-4" />
                                         </button>
                                         <button className="p-1.5 text-violet-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                           <Trash2 className="w-4 h-4" />
                                         </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-violet-500 text-sm">No categories found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesView
