"use client";
import React from "react";
import Image from "next/image";

// 1. Update the interface to include gradientClass
interface AchievementCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  gradientClass?: string;
}

export default function AchievementCard({
  image,
  title,
  subtitle,
  description,
  gradientClass, // 2. Destructure the prop here
}: AchievementCardProps) {
  return (
    <div className="group relative w-[90%] rounded-2xl border border-gray-600/40 p-6 flex items-start gap-6 ml-14 mr-14 overflow-visible bg-white/5 backdrop-blur-[75px]">
      
      {/* Photo Container */}
      <div className="relative w-full max-w-[900px] sm:max-w-[700px] md:max-w-[593px] sm:max-h-[480px] md:max-h-[800px] lg:max-h-[900px] max-h-[900px] aspect-[16/9] rounded-[18px] overflow-visible border-[3px] border-[#E18C50] bg-gradient-to-b from-transparent to-black -mt-10 z-30 shadow-2xl">
        
        {/* 3. DYNAMIC ACCENT CIRCLE 
            I replaced 'bg-[#E58F52]' with '${gradientClass}' 
            so it uses the blue or orange gradient passed from the parent.
        */}
        <div 
          className={`absolute -right-10 top-12 w-[187px] h-[187px] rounded-full blur-[40px] opacity-0 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none -z-10 ${gradientClass}`} 
        />
        
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top"
          priority
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />

        {/* Subtitle */}
        {subtitle && (
          <div className="absolute left-4 bottom-4 w-[248px] flex items-center text-white text-[24px] font-extrabold leading-[15px] z-20">
            {subtitle}
          </div>
        )}
      </div>

      {/* Right content */}
      <div className="relative z-10 flex-1 min-w-[300px]">
        <div className="flex flex-col gap-3">
          {/* Translucent heading box */}
          <div className="px-4 text-[16px]">
            <div className="text-[18px] font-bold text-white/60 leading-[15px]">
              {title}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-white/60 text-[16px] leading-[15px] max-w-[552px] mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
