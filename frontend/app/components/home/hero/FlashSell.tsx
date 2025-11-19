"use client";

import React, { useState, useEffect } from "react";
import { Zap, Clock } from "lucide-react";

const FlashSell = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 22,
    minutes: 45,
    seconds: 30,
  });

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
    <div
      className="
        w-full max-w-md 
        sm:max-w-xl 
        mx-auto p-4 sm:p-6 md:p-8 
        mb-5
        bg-white rounded-2xl shadow-xl
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-col sm:flex-row 
          items-center justify-between 
          gap-3 sm:gap-6
        "
      >
        <h2
          className="
            text-xl sm:text-2xl md:text-3xl font-extrabold 
            bg-gradient-to-r from-cyan-300 to-cyan-500 
            bg-clip-text text-transparent 
            flex items-center gap-2 
            animate-pulse text-center sm:text-left
          "
        >
          Mega Flash Sale
          <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
        </h2>

        <div className="flex items-center gap-2 sm:gap-3">
          <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-500" />
          <span className="text-sm sm:text-base text-cyan-600 font-medium">
            Ends in:
          </span>
        </div>
      </div>

      {/* Countdown Section */}
      <div
        className="
          flex flex-wrap justify-center 
          gap-3 sm:gap-4 mt-5 sm:mt-6
        "
      >
        {["hours", "minutes", "seconds"].map((unit, i) => {
          const value = String(timeLeft[unit]).padStart(2, "0");
          const label =
            unit === "hours" ? "Hours" : unit === "minutes" ? "Mins" : "Secs";

          return (
            <div
              key={i}
              className="
                flex flex-col items-center justify-center 
                px-4 py-3 
                sm:px-5 sm:py-4 
                rounded-xl 
                min-w-[70px] 
                bg-gradient-to-tr from-cyan-600 via-cyan-500 to-cyan-400
                shadow-lg shadow-cyan-500/40 
                hover:scale-105 transition-all duration-300
              "
            >
              <span
                className="
                  text-2xl sm:text-3xl md:text-4xl 
                  font-extrabold text-white 
                  drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]
                "
              >
                {value}
              </span>
              <span className="text-xs sm:text-sm text-cyan-100 uppercase tracking-wider">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Decorative glow line */}
      <div
        className="
          mt-6 h-1 w-full rounded-full 
          bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-300 
          animate-pulse
        "
      />
    </div>
  );
};

export default FlashSell;
