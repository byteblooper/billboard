import React from 'react'

type PersonalInfoTabProps = {
  userInfo: {
    name: string
    email: string
    phone: string
    location: string
    joinDate: string
  }
}

const PersonalInfoTab = ({ userInfo }: PersonalInfoTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-violet-700 mb-2">Full Name</label>
          <input
            type="text"
            value={userInfo.name}
            readOnly
            className="w-full px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-violet-700 mb-2">Email Address</label>
          <input
            type="email"
            value={userInfo.email}
            readOnly
            className="w-full px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-violet-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={userInfo.phone}
            readOnly
            className="w-full px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-violet-700 mb-2">Member Since</label>
          <input
            type="text"
            value={userInfo.joinDate}
            readOnly
            className="w-full px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-violet-700 mb-2">Address</label>
        <input
          type="text"
          value={userInfo.location}
          readOnly
          className="w-full px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>
    </div>
  )
}

export default PersonalInfoTab
