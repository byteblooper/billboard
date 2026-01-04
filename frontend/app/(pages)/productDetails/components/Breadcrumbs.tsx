'use client'

import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

const Breadcrumbs = ({
  items,
}: {
  items: { label: string; href?: string }[]
}) => {
  return (
    <nav className="flex items-center gap-2 text-sm overflow-x-auto pb-2">
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-500 hover:text-violet-600 transition-colors shrink-0"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-violet-600 transition-colors shrink-0"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-violet-700 font-medium truncate">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumbs
