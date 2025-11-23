'use client'

import React, { useState } from 'react'
import { Search, Send, CheckCheck, Clock } from 'lucide-react'
import Image from 'next/image'

const ChatsView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChat, setSelectedChat] = useState<number | null>(1)

  const chats = [
    {
      id: 1,
      customer: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Thank you for the quick response!',
      timestamp: '2 min ago',
      unreadCount: 2,
      status: 'active',
      messages: [
        { id: 1, sender: 'customer', text: 'Hi, I need help with my order #12345', time: '10:30 AM', read: true },
        { id: 2, sender: 'admin', text: 'Hello! I\'d be happy to help. Let me check your order status.', time: '10:32 AM', read: true },
        { id: 3, sender: 'admin', text: 'Your order has been shipped and will arrive in 2-3 days.', time: '10:33 AM', read: true },
        { id: 4, sender: 'customer', text: 'Thank you for the quick response!', time: '10:35 AM', read: false }
      ]
    },
    {
      id: 2,
      customer: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=13',
      lastMessage: 'Can I get a refund?',
      timestamp: '15 min ago',
      unreadCount: 1,
      status: 'active',
      messages: [
        { id: 1, sender: 'customer', text: 'I received the wrong item', time: '9:45 AM', read: true },
        { id: 2, sender: 'admin', text: 'I apologize for the inconvenience. Can you send a photo?', time: '9:50 AM', read: true },
        { id: 3, sender: 'customer', text: 'Can I get a refund?', time: '10:20 AM', read: false }
      ]
    },
    {
      id: 3,
      customer: 'Emma Davis',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Product quality is excellent',
      timestamp: '1 hour ago',
      unreadCount: 0,
      status: 'resolved',
      messages: [
        { id: 1, sender: 'customer', text: 'Just wanted to say the product quality is excellent', time: '9:15 AM', read: true },
        { id: 2, sender: 'admin', text: 'Thank you so much for your feedback! We appreciate it.', time: '9:20 AM', read: true }
      ]
    },
    {
      id: 4,
      customer: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'When will it be back in stock?',
      timestamp: '2 hours ago',
      unreadCount: 3,
      status: 'active',
      messages: [
        { id: 1, sender: 'customer', text: 'The item I want is out of stock', time: '8:30 AM', read: true },
        { id: 2, sender: 'customer', text: 'When will it be back in stock?', time: '8:31 AM', read: false }
      ]
    },
    {
      id: 5,
      customer: 'Lisa Anderson',
      avatar: 'https://i.pravatar.cc/150?img=9',
      lastMessage: 'Thanks for the discount code!',
      timestamp: '3 hours ago',
      unreadCount: 0,
      status: 'resolved',
      messages: [
        { id: 1, sender: 'customer', text: 'Do you have any discount codes?', time: '7:45 AM', read: true },
        { id: 2, sender: 'admin', text: 'Yes! Use code WELCOME20 for 20% off', time: '7:50 AM', read: true },
        { id: 3, sender: 'customer', text: 'Thanks for the discount code!', time: '8:00 AM', read: true }
      ]
    },
    {
      id: 6,
      customer: 'David Brown',
      avatar: 'https://i.pravatar.cc/150?img=14',
      lastMessage: 'Issue with payment',
      timestamp: '5 hours ago',
      unreadCount: 1,
      status: 'active',
      messages: [
        { id: 1, sender: 'customer', text: 'I\'m having an issue with payment', time: '5:30 AM', read: true },
        { id: 2, sender: 'admin', text: 'Can you describe the issue?', time: '5:45 AM', read: true }
      ]
    },
    {
      id: 7,
      customer: 'Sophia Martinez',
      avatar: 'https://i.pravatar.cc/150?img=16',
      lastMessage: 'Great customer service!',
      timestamp: '1 day ago',
      unreadCount: 0,
      status: 'resolved',
      messages: [
        { id: 1, sender: 'customer', text: 'Great customer service!', time: 'Yesterday', read: true },
        { id: 2, sender: 'admin', text: 'Thank you! We\'re always here to help.', time: 'Yesterday', read: true }
      ]
    },
    {
      id: 8,
      customer: 'Robert Taylor',
      avatar: 'https://i.pravatar.cc/150?img=15',
      lastMessage: 'How do I track my order?',
      timestamp: '2 days ago',
      unreadCount: 0,
      status: 'resolved',
      messages: [
        { id: 1, sender: 'customer', text: 'How do I track my order?', time: '2 days ago', read: true },
        { id: 2, sender: 'admin', text: 'You can track it using the link sent to your email', time: '2 days ago', read: true }
      ]
    }
  ]

  const filteredChats = chats.filter(chat =>
    chat.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentChat = chats.find(chat => chat.id === selectedChat)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-violet-900">Customer Chats</h2>
        <p className="text-sm text-violet-600 mt-0.5">Manage customer support conversations</p>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg border border-violet-200 overflow-hidden h-[600px] flex">
        {/* Chat List */}
        <div className="w-80 border-r border-violet-200 flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-violet-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -tranviolet-y-1/2 w-4 h-4 text-violet-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              />
            </div>
          </div>

          {/* Chats */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-3 border-b border-violet-100 hover:bg-violet-50 transition-colors text-left ${
                  selectedChat === chat.id ? 'bg-violet-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Image
                      src={chat.avatar}
                      alt={chat.customer}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {chat.status === 'active' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-violet-900 text-sm truncate">{chat.customer}</span>
                      <span className="text-xs text-violet-500 flex-shrink-0 ml-2">{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-violet-600 truncate">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 bg-violet-500 text-white text-xs font-medium rounded-full flex-shrink-0">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        {currentChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-violet-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={currentChat.avatar}
                  alt={currentChat.customer}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium text-violet-900">{currentChat.customer}</h3>
                  <p className="text-sm text-violet-500">
                    {currentChat.status === 'active' ? 'Active now' : 'Resolved'}
                  </p>
                </div>
              </div>
              {currentChat.status === 'active' && (
                <button className="px-3 py-1.5 text-sm font-medium text-violet-700 bg-violet-100 hover:bg-violet-200 rounded-lg transition-colors">
                  Mark as Resolved
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {currentChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md ${message.sender === 'admin' ? 'order-2' : ''}`}>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === 'admin'
                          ? 'bg-violet-500 text-white'
                          : 'bg-violet-100 text-violet-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 px-1">
                      <span className="text-xs text-violet-500">{message.time}</span>
                      {message.sender === 'admin' && (
                        message.read ? (
                          <CheckCheck className="w-3 h-3 text-blue-500" />
                        ) : (
                          <Clock className="w-3 h-3 text-violet-400" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            {currentChat.status === 'active' && (
              <div className="p-4 border-t border-violet-200">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                  />
                  <button className="p-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-violet-500">Select a conversation to view messages</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatsView
