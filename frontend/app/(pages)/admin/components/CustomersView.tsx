'use client'

import React, { useState } from 'react'
import { Download, Search, Eye, Mail, Phone, Edit, Trash2 } from 'lucide-react'


const CustomersView = () => {
    
    const demoCustomers = [
      { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+1 234-567-8901', orders: 12, totalSpent: 1849.88, joined: '2024-08-15', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 234-567-8902', orders: 8, totalSpent: 1234.56, joined: '2024-09-20', status: 'active' },
      { id: 3, name: 'Mike Johnson', email: 'mike.j@email.com', phone: '+1 234-567-8903', orders: 15, totalSpent: 2456.75, joined: '2024-07-10', status: 'active' },
      { id: 4, name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '+1 234-567-8904', orders: 5, totalSpent: 678.90, joined: '2024-10-05', status: 'active' },
      { id: 5, name: 'Tom Brown', email: 'tom.brown@email.com', phone: '+1 234-567-8905', orders: 3, totalSpent: 345.67, joined: '2024-11-01', status: 'inactive' },
      { id: 6, name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 234-567-8906', orders: 20, totalSpent: 3456.78, joined: '2024-06-12', status: 'active' },
      { id: 7, name: 'David Wilson', email: 'david.w@email.com', phone: '+1 234-567-8907', orders: 9, totalSpent: 1567.89, joined: '2024-08-28', status: 'active' },
      { id: 8, name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '+1 234-567-8908', orders: 6, totalSpent: 890.45, joined: '2024-09-14', status: 'active' }
    ]
    const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = demoCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Customers Management</h2>
        
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="sm:hidden divide-y divide-gray-200">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{customer.name}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-gray-600 mt-0.5">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
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
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-900 font-medium">{customer.orders} orders</span>
                    <span className="text-gray-500">•</span>
                    <span className="font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
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
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Customer</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Contact</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Orders</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Total Spent</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Joined</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600">Status</th>
              <th className="text-right p-4 text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{customer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-900 font-medium">{customer.orders}</td>
                <td className="p-4 text-sm font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-600">{customer.joined}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
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
      
      {filteredCustomers.length === 0 && (
        <div className="p-6 sm:p-8 text-center text-gray-500">
          <p className="text-sm">No customers found</p>
        </div>
      )}
    </div>
  )
}

export default CustomersView
