import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

const PosterCanvas = forwardRef(({ details, isPremium }, ref) => {
  const { title, date, venue, type, image, themeColor } = details;

  // Default background if user hasn't uploaded one
  const bgImage = image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop";

  // Template Logic
  const isChurch = type === 'church';
  const isParty = type === 'party';
  
  return (
    <div 
      ref={ref}
      className="relative w-full aspect-[4/5] bg-gray-900 overflow-hidden shadow-2xl text-white"
      id="poster-node"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-60" />
        <div className={clsx(
          "absolute inset-0 bg-gradient-to-t",
          isChurch ? "from-black via-transparent to-black/40" : "from-purple-900/80 via-transparent to-black/60"
        )} />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
        
        {/* Top Section */}
        <div className={clsx("text-center", isParty ? "mt-12" : "mt-4")}>
          <span className="uppercase tracking-[0.3em] text-xs font-bold opacity-80">
            {isChurch ? "You are invited to" : "Presenting"}
          </span>
        </div>

        {/* Middle Section (Title) */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className={clsx(
            "text-center leading-tight drop-shadow-lg",
            isChurch ? "font-serif text-5xl text-yellow-500" : "font-extrabold text-6xl italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400"
          )}>
            {title || "Event Title"}
          </h1>
        </div>

        {/* Bottom Section (Details) */}
        <div className={clsx(
          "border-t border-white/20 pt-6",
          isChurch ? "text-center" : "text-left"
        )}>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-white">{date || "Date & Time"}</p>
            <p className="text-sm opacity-80 uppercase tracking-wider">{venue || "Location / Venue"}</p>
          </div>

          {/* Watermark Logic */}
          {!isPremium && (
            <div className="absolute bottom-2 right-4 opacity-60">
              <p className="text-[10px] uppercase tracking-widest">Made with PosterFlow</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PosterCanvas;