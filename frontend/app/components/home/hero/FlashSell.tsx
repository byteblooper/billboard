"use client";

import React, { useState, useEffect } from "react";
import { Zap, Clock } from "lucide-react";

const FlashSell = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 22,
    minutes: 45,
    seconds: 30,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-xl sm:max-w-2xl mx-auto p-6 sm:p-8 bg-white/10 backdrop-blur-lg border border-indigo-600/20 rounded-2xl shadow-xl shadow-indigo-400/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent flex items-center gap-2 animate-pulse">
          Mega Flash Sale
          <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-400" />
        </h2>

        <div className="flex items-center gap-2 sm:gap-3 text-indigo-200">
          <Clock className="w-4 sm:w-5 h-4 text-violet-600 sm:h-5" />
          <span className="text-sm sm:text-base text-violet-600 font-medium">
            Ends in:
          </span>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 justify-center">
        {["hours", "minutes", "seconds"].map((unit, i) => {
          const value = String(
            timeLeft[unit as keyof typeof timeLeft]
          ).padStart(2, "0");
          const label =
            unit === "hours" ? "Hours" : unit === "minutes" ? "Mins" : "Secs";
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center px-5 py-3 rounded-xl min-w-[70px] sm:min-w-20 bg-linear-to-tr from-indigo-600 via-violet-600 to-indigo-500 shadow-lg shadow-violet-500/30 transform hover:scale-105 transition-all duration-300"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
                {value}
              </span>
              <span className="text-xs sm:text-sm text-indigo-200 uppercase tracking-wider">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Decorative Footer Glow */}
      <div className="mt-6 h-1 w-full rounded-full bg-linear-to-r from-indigo-400 via-violet-500 to-indigo-400 animate-pulse" />
    </div>
  );
};

export default FlashSell;