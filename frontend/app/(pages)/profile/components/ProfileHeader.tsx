import React from 'react'
import { Camera, Edit2, Mail, MapPin, Phone, Settings } from 'lucide-react'
import Image from 'next/image'

type ProfileHeaderProps = {
  userInfo: {
    name: string
    email: string
    phone: string
    location: string
    avatar: string
    memberLevel: string
  }
}

const ProfileHeader = ({ userInfo }: ProfileHeaderProps) => {
  return (
    <div className="bg-gradient-to-br from-violet-900 via-violet-800 to-violet-900 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,146,60,0.2),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* Avatar */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full blur opacity-75"></div>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src={userInfo.avatar}
              alt={userInfo.name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h1 className="text-3xl font-bold">{userInfo.name}</h1>
            <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full text-xs font-semibold">
              {userInfo.memberLevel}
            </span>
          </div>
          <div className="space-y-2 text-violet-300">
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4" />
              {userInfo.email}
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4" />
              {userInfo.phone}
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4" />
              {userInfo.location}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white text-violet-900 rounded-xl font-semibold hover:bg-violet-100 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
       
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
