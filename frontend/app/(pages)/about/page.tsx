import React from 'react'
import { MapPin, Users, Store, Award, TrendingUp, Shield, Zap, Heart, Clock, BadgeCheck, Globe, Target } from 'lucide-react'
import Image from 'next/image'

// Demo Data
const statsData = [
  { value: '50K+', label: 'Active Users' },
  { value: '2,000+', label: 'Partner Stores' },
  { value: '100K+', label: 'Products' },
  { value: '50KM', label: 'Radius' }
]

const coreValues = [
  {
    icon: Shield,
    title: 'Trust & Safety',
    desc: 'Every store is verified, every product guaranteed',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Zap,
    title: 'Speed & Efficiency',
    desc: 'Lightning-fast delivery from stores near you',
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: Heart,
    title: 'Community First',
    desc: 'Supporting local businesses and neighborhoods',
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: BadgeCheck,
    title: 'Quality Assured',
    desc: 'Premium products at competitive prices',
    color: 'from-blue-500 to-indigo-500'
  }
]

const whyChooseUs = [
  {
    icon: MapPin,
    title: 'Hyper-Local Focus',
    desc: 'All products from stores within 50KM radius',
    stats: '50KM Radius'
  },
  {
    icon: Clock,
    title: 'Same-Day Delivery',
    desc: 'Get your orders delivered on the same day',
    stats: '2-4 Hours'
  },
  {
    icon: Store,
    title: 'Verified Stores',
    desc: 'Every merchant verified and quality-checked',
    stats: '100% Verified'
  },
  {
    icon: TrendingUp,
    title: 'Best Prices',
    desc: 'Competitive pricing with exclusive deals',
    stats: 'Up to 70% Off'
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Real reviews from real local customers',
    stats: '50K+ Reviews'
  },
  {
    icon: Award,
    title: 'Premium Support',
    desc: '24/7 customer support for all your needs',
    stats: '24/7 Support'
  }
]

const teamMembers = [
  
  {
    name: 'David Kim',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Lisa Anderson',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    gradient: 'from-purple-500 to-violet-500'
  },
 
  {
    name: 'Maria Garcia',
    role: 'Customer Success',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    name: 'Robert Taylor',
    role: 'Business Development',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
    gradient: 'from-red-500 to-orange-500'
  }
]

const page = () => {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,146,60,0.2),transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-300">About NearByDeals</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              Connecting You to Local Deals Within 50KM
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              We are revolutionizing local shopping by bringing verified stores, instant deals, 
              and premium products right to your fingertips. Experience shopping the way it should be.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To empower local communities by creating a seamless shopping experience that connects 
                customers with verified stores within their neighborhood.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We believe in supporting local businesses while providing customers with the convenience 
                of online shopping and the trust of verified, quality products.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To become the most trusted local shopping platform, bridging the gap between traditional 
                retail and modern e-commerce.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We envision a future where every purchase supports local economy, reduces delivery times, 
                and builds stronger community connections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Core Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                    <p className="text-slate-600">{value.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose NearByDeals?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We&apos;re not just another shopping platform. We&apos;re your local shopping companion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {whyChooseUs.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-orange-300 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-orange-600 font-bold text-lg">{feature.stats}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Meet Our Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The passionate people behind NearByDeals, working hard to revolutionize local shopping
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative mb-6">
                    <div className={`absolute -inset-1 bg-gradient-to-br ${member.gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition-opacity`}></div>
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                      {member.role}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-slate-100">
                    <a href="#" className="w-8 h-8 bg-slate-100 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors group/icon">
                      <svg className="w-4 h-4 text-slate-600 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-8 h-8 bg-slate-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group/icon">
                      <svg className="w-4 h-4 text-slate-600 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Join Our Community Today</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              Experience the future of local shopping. Find deals, support local businesses, 
              and get same-day delivery on everything you need.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-xl">
                Start Shopping Now
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-105">
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
