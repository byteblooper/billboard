'use client'

import React from 'react'
import { Filter } from 'lucide-react'

interface NoFilterMatchProps {
  onClearFilter: () => void
}

const NoFilterMatch: React.FC<NoFilterMatchProps> = ({ onClearFilter }) => {
  return (
    <div className="bg-white rounded-xl border border-violet-200 p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center">
        <Filter className="w-8 h-8 text-violet-400" />
      </div>
      <h3 className="text-xl font-semibold text-violet-900 mb-2">No items match your filter</h3>
      <p className="text-violet-600 mb-6 text-sm">
        Try adjusting your filters to see more items
      </p>
      <button
        onClick={onClearFilter}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-colors"
      >
        Show All Items
      </button>
    </div>
  )
}

export default NoFilterMatch
