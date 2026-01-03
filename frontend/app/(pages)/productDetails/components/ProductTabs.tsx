'use client'

import React, { useState } from 'react'
import { Info, Settings, MessageSquare, ChevronDown } from 'lucide-react'

interface ProductTabsProps {
  description: string
  specifications: { label: string; value: string }[]
}

const ProductTabs: React.FC<ProductTabsProps> = ({ description, specifications }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'faq'>('description')

  const tabs = [
    { id: 'description' as const, label: 'Description', icon: Info },
    { id: 'specs' as const, label: 'Specifications', icon: Settings },
    { id: 'faq' as const, label: 'FAQs', icon: MessageSquare }
  ]

  const faqs = [
    {
      question: 'What is the return policy?',
      answer: 'You can return this product within 30 days of delivery for a full refund. The product must be unused and in its original packaging.'
    },
    {
      question: 'Is this product covered under warranty?',
      answer: "Yes, this product comes with a 1-year manufacturer's warranty that covers defects in materials and workmanship."
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery at an additional cost.'
    },
    {
      question: 'Can I pick up this item in store?',
      answer: 'Yes! You can choose store pickup at checkout. The item will be ready within 2 hours of placing your order.'
    }
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-violet-100">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-violet-700 bg-violet-50 border-b-2 border-violet-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose prose-violet max-w-none">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-1">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className={`flex py-3 px-4 rounded-lg ${
                  index % 2 === 0 ? 'bg-violet-50/50' : 'bg-white'
                }`}
              >
                <span className="w-1/3 text-sm text-gray-500">{spec.label}</span>
                <span className="w-2/3 text-sm font-medium text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-violet-100 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-violet-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-violet-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductTabs
