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
});

export default PosterCanvas;