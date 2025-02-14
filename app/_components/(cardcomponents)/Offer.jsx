"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const SaleCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 19,
    seconds: 54
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        return {
          hours: newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
  
    "Women's Fashion",
    "Smart Phones & Tablets",
    "Computing & Gaming",
    "Home & Living",
    "Gadgets",
    "Grocer's Shop",
    "Accessories"
  ];

  return (
    <div className="max-w-xs bg-white p-12 h-svh rounded-lg shadow-sm">
      {/* Sale Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-semibold leading-5">UP <br /> TO </span>
          <span className='text-3xl font-bold'>70%</span>
          <div >
            <span className="text-primaryColor text-2xl font-semibold">Hurry Up!</span>
          <div className="text-ls text-gray-600 ">Offer ends in:</div>
          </div>
        </div>
        
        {/* Countdown Timer */}
        <div className="flex gap-2 items-center text-lg font-mono mt-8">
         <div className='text-center'>
            <div className="bg-gray-100 px-6 py-4 rounded">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
              <span className='font-semibold'>Hour</span>
         </div>
          <span>:</span>
        <div className='text-center'>
            <div className="bg-gray-100 px-6 py-4 rounded">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
              <span className='font-semibold'>Min</span>
        </div>
          <span>:</span>
         <div className='text-center'>
            <div className="bg-gray-100 px-6 py-4 rounded">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <span className='font-semibold'>Sec</span>
         </div>
        </div>
      </div>

      <div className='flex items-center gap-1 mt-10'>
        <hr className='border border-primaryColor w-9' />
          <p className='bg-secondaryColor py-2 px-3 font-medium'>Beauty & Health</p>
      </div>

      {/* Categories */}
      <div className="space-y-6 mt-8">
        {categories.map((category, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Camera Banner */}
      <div className="mt-8 bg-gray-800 text-white p-4 rounded-lg relative overflow-hidden">
        <div className="text-4xl font-bold">6K</div>
        <div className="text-sm">CAMERAS</div>
        <div className="flex items-center mt-1 text-sm">
          <span>ALL-NEW-SPORT</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default SaleCountdown;