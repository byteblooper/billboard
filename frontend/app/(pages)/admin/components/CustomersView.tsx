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
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="font-semibold text-slate-900">Customers Management</h2>
        
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers..."
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
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Customer</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Contact</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Orders</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Total Spent</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Joined</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Status</th>
              <th className="text-right p-4 text-xs font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{customer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-900 font-medium">{customer.orders}</td>
                <td className="p-4 text-sm font-semibold text-slate-900">${customer.totalSpent.toFixed(2)}</td>
                <td className="p-4 text-sm text-slate-600">{customer.joined}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
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
      
      {filteredCustomers.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          <p>No customers found</p>
        </div>
      )}
    </div>
  )
}

export default CustomersView
