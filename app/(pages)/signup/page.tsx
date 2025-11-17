'use client'

import React, { useState } from 'react'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShoppingBag, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


type FormEventType = React.FormEvent<HTMLFormElement>
type InputChangeType = React.ChangeEvent<HTMLInputElement>


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const handleSubmit = (e: FormEventType) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: InputChangeType) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden md:block">
            <div className="bg-linear-to-br from-orange-500 to-amber-600 rounded-3xl p-12 text-white shadow-2xl">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white p-3 rounded-xl">
                    <ShoppingBag className="w-8 h-8 text-orange-500" />
                  </div>
                  <h1 className="text-3xl font-bold">NearByDeals</h1>
                </div>
                <p className="text-orange-100 text-lg">
                  Discover amazing deals from shops near you
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-400 p-2 rounded-lg shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location-Based Shopping</h3>
                    <p className="text-orange-100">Find deals from stores closest to you</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-400 p-2 rounded-lg shrink-0">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Exclusive Offers</h3>
                    <p className="text-orange-100">Access special deals and discounts</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-400 p-2 rounded-lg shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Personalized Experience</h3>
                    <p className="text-orange-100">Tailored recommendations just for you</p>
                  </div>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop"
                  alt="Shopping illustration"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
              <p className="text-slate-600">Join us to discover amazing local deals</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    required
                    className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="w-5 h-5 mt-0.5 text-orange-500 border-slate-300 rounded focus:ring-orange-500"
                />
                <label className="text-sm text-slate-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-semibold">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-semibold">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Social Sign Up */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-semibold text-slate-700">Continue with Google</span>
                </button>
              </div>
            </div>

            {/* Sign In Link */}
            <p className="mt-8 text-center text-slate-600">
              Already have an account?{' '}
              <Link href="/signin" className="text-orange-600 hover:text-orange-700 font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage

