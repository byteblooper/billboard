'use client'

import React, { useState, useEffect } from 'react'
import { Zap, Clock } from 'lucide-react'

const FlashSell = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 22,
    minutes: 45,
    seconds: 30
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) seconds--
        else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 py-12 mx-auto w-[35%] border-2 border-orange-200 rounded-xl shadow-lg my-10">
      

      <div className='flex items-center justify-center gap-5  '>
         <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2">
              Mega Flash Sale
              <Zap className="w-6 h-6 text-orange-500 fill-orange-500" />
            </h2>

         <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-orange-500" />
        <span className="text-sm font-medium">Ends in:</span>
      </div>
      </div>
     
      {/* Countdown Section */}
      <div className="flex gap-2 mt-5 justify-center">
        {/* Hours */}
        <div className="flex flex-col items-center bg-gradient-to-br from-orange-500 to-red-500 rounded-lg px-3 py-2 min-w-[60px] shadow-lg">
          <span className="text-2xl font-bold text-white">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-xs text-orange-100 uppercase">Hours</span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center bg-gradient-to-br from-orange-500 to-red-500 rounded-lg px-3 py-2 min-w-[60px] shadow-lg">
          <span className="text-2xl font-bold text-white">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-xs text-orange-100 uppercase">Mins</span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center bg-gradient-to-br from-orange-500 to-red-500 rounded-lg px-3 py-2 min-w-[60px] shadow-lg">
          <span className="text-2xl font-bold text-white">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-orange-100 uppercase">Secs</span>
        </div>
      </div>

    </div>
  )
}

export default FlashSell
