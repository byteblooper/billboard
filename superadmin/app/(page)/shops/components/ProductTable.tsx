'use client';

import { Product } from './types';

interface ProductTableProps {
  products: Product[];
  onViewProduct?: (product: Product) => void;
}

export default function ProductTable({ products, onViewProduct }: ProductTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: Product['status']) => {
    const config = {
      active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'Active' },
      inactive: { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500', label: 'Inactive' },
      out_of_stock: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'Out of Stock' },
    };
    const c = config[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {c.label}
      </span>
    );
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onViewProduct?.(product)}
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-gray-600 font-mono">{product.sku}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-gray-900">{formatCurrency(product.price)}</span>
              </td>
              <td className="py-3 px-4">
                <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-yellow-600' : 'text-gray-900'}`}>
                  {product.stock}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-gray-600">{product.sold}</span>
              </td>
              <td className="py-3 px-4">
                {getStatusBadge(product.status)}
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-green-600">
                  {formatCurrency(product.price * product.sold)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
