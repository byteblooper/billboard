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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-violet-900">Categories</h2>
          <p className="text-sm text-violet-600 mt-0.5">Manage product categories and subcategories</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -tranviolet-y-1/2 w-4 h-4 text-violet-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-violet-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-violet-50 border-b border-violet-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-violet-600 uppercase">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-violet-600 uppercase">Slug</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-violet-600 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-violet-600 uppercase">Products</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-violet-600 uppercase">Subcategories</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-violet-600 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-violet-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-100">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-violet-50 transition-colors">
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
          <div className="text-center py-12">
            <p className="text-violet-500 text-sm">No categories found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesView
