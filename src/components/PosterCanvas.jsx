import React, { forwardRef, useState, useEffect, memo } from 'react';
import { clsx } from 'clsx';
import { Loader2, ImageOff } from 'lucide-react';

const PosterCanvas = memo(forwardRef(({ details, isPremium }, ref) => {
  const { title, date, time, venue, description, type, image, themeColor } = details;
  
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Reset loading state when image source changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [image, type]);

  // Default Backgrounds (Improved for "Full Product")
  const defaultBgs = {
    church: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000",
    party: "https://images.unsplash.com/photo-1514525253440-b393452e3720?q=80&w=1000",
    business: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
    funeral: "https://images.unsplash.com/photo-1605218427368-351816b5b6e5?q=80&w=1000" // Red rose / Dark
  };

  const bgImage = image || defaultBgs[type] || defaultBgs.church;

  // --- TEMPLATE LOGIC ---
  const isChurch = type === 'church';
  const isParty = type === 'party';
  const isFuneral = type === 'funeral';
  const isBusiness = type === 'business';

  // Color Logic (User override > Template Default)
  let textColor = "text-white";
  let accentColor = "text-yellow-500";
  
  if (themeColor === 'red') accentColor = "text-red-600";
  if (themeColor === 'blue') accentColor = "text-blue-400";
  if (themeColor === 'neon') accentColor = "text-fuchsia-400";
  if (themeColor === 'gold') accentColor = "text-yellow-400";

  // Force Funeral Colors if Auto
  if (isFuneral && themeColor === 'default') accentColor = "text-red-600";

  return (
    <div 
      ref={ref}
      className="relative w-full aspect-[4/5] bg-gray-900 overflow-hidden shadow-2xl text-white"
      id="poster-node"
    >
      {/* 1. Background Layer */}
      <div className="absolute inset-0 bg-gray-800">
        {/* Loading Skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
          </div>
        )}
        
        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 z-10 text-gray-500">
            <ImageOff className="w-8 h-8 mb-2" />
            <span className="text-xs uppercase tracking-widest">Image Failed</span>
          </div>
        )}

        <img 
          src={bgImage} 
          alt="Background" 
          className={clsx(
            "w-full h-full object-cover transition-opacity duration-700",
            imageLoading ? "opacity-0" : "opacity-100"
          )}
          loading="lazy"
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
        />
        {/* Smart Overlays based on type */}
        <div className={clsx(
          "absolute inset-0 mix-blend-multiply",
          isChurch && "bg-black/60",
          isParty && "bg-purple-900/60",
          isFuneral && "bg-black/70", // Darker for funeral
          isBusiness && "bg-blue-900/80"
        )} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* 2. Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
        
        {/* Top Header */}
        <div className="text-center pt-4">
          <span className={clsx(
            "uppercase tracking-[0.3em] text-xs font-bold opacity-90",
            isFuneral ? "text-red-500" : "text-white"
          )}>
            {isFuneral ? "Celebration of Life" : isBusiness ? "You are invited to" : "Presenting"}
          </span>
        </div>

        {/* Main Title Area */}
        <div className="flex flex-col items-center justify-center flex-grow space-y-4">
          {isFuneral && <p className="font-serif italic text-lg opacity-80">The Late</p>}
          
          <h1 className={clsx(
            "text-center leading-tight drop-shadow-lg break-words w-full",
            isChurch ? `font-serif text-5xl ${accentColor}` : "",
            isParty ? `font-extrabold text-6xl italic uppercase ${accentColor}` : "",
            isBusiness ? "font-bold text-4xl text-white tracking-tight" : "",
            isFuneral ? `font-serif text-5xl text-white border-b-2 border-red-600 pb-2` : ""
          )}>
            {title || "Event Title"}
          </h1>

          {isFuneral && <p className="text-sm font-bold uppercase tracking-widest opacity-70">Aged 85</p>}
          
          {description && (
            <p className={clsx(
              "text-center max-w-xs text-sm opacity-90",
              isParty ? "font-bold text-pink-200" : "font-light text-gray-200"
            )}>
              {description}
            </p>
          )}
        </div>

        {/* Bottom Details */}
        <div className={clsx(
          "border-t border-white/20 pt-6",
          isChurch || isFuneral ? "text-center" : "text-left"
        )}>
          <div className="flex flex-col gap-1">
            <p className={clsx("text-xl font-bold", accentColor)}>
              {date || "Date"} <span className="text-white mx-2">|</span> {time || "Time"}
            </p>
            <p className="text-sm opacity-80 uppercase tracking-wider flex items-center gap-2 justify-center">
              {venue || "Location / Venue"}
            </p>
          </div>

          {/* Watermark */}
          {!isPremium && (
            <div className="absolute bottom-2 right-4 opacity-50">
              <p className="text-[8px] uppercase tracking-widest">Designed with PosterFlow</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}));

export default PosterCanvas;