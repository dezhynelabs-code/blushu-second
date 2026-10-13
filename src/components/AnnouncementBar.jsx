import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Sparkles, X } from 'lucide-react';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!siteConfig.announcement.enabled || !isVisible) {
    return null;
  }

  return (
    <div className="bg-[#075E50] text-[#EAF5F0] text-xs sm:text-sm font-medium tracking-wide py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#A3E5D0] shrink-0" />
          <span>
            {siteConfig.announcement.message}{' '}
            <span className="hidden md:inline font-normal opacity-90 text-[#D1E7DC]">
              • {siteConfig.announcement.secondaryMessage}
            </span>
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="text-[#EAF5F0]/70 hover:text-white p-1 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
