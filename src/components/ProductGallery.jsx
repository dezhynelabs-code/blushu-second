import React, { useState, useRef } from 'react';
import { ZoomIn, CheckCircle2, Maximize2, X, Sparkles, Eye } from 'lucide-react';

export const ProductGallery = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);

  const images = product?.images && product.images.length > 0 ? product.images : [
    {
      id: 'default',
      src: product?.image || '/images/blushu-sunscreen-main.png',
      alt: product?.name || 'BLUSHU Sunscreen',
      caption: 'Official Product View'
    }
  ];

  const currentImage = images[selectedImageIndex] || images[0];

  // High-precision smooth pan & zoom tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setZoomPos({ x: 50, y: 50 });
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 sm:gap-6 relative select-none">
      
      {/* 1. Vertical Thumbnail Bar (Desktop: Left, Mobile: Bottom/Top) */}
      <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 pb-2 md:pb-0 scrollbar-none order-2 md:order-1">
        {images.map((img, idx) => {
          const isSelected = selectedImageIndex === idx;
          return (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setSelectedImageIndex(idx)}
              onMouseEnter={() => setSelectedImageIndex(idx)}
              className={`relative w-16 h-20 md:w-24 md:h-28 rounded-2xl p-1.5 flex flex-col items-center justify-between transition-all border-2 shrink-0 bg-white shadow-xs overflow-hidden ${
                isSelected
                  ? 'border-[#087F68] ring-2 ring-[#087F68]/25 shadow-md'
                  : 'border-[#E3ECE7] hover:border-[#A3E5D0] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center p-0.5">
                <img
                  src={img.src}
                  alt={img.alt || `View ${idx + 1}`}
                  className="max-h-full max-w-full object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
              {img.tag && (
                <span className={`w-full text-center py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md mt-1 ${
                  isSelected ? 'bg-[#087F68] text-white' : 'bg-[#F8F8F3] text-[#69736E]'
                }`}>
                  {img.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Main High-Definition Display with Smooth Precision Zoom */}
      <div className="flex-1 relative order-1 md:order-2">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative bg-[#F8F8F3] rounded-3xl border border-[#E3ECE7] flex items-center justify-center min-h-[420px] sm:min-h-[520px] overflow-hidden group cursor-zoom-in"
        >
          {/* Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#EAF5F0] blur-3xl pointer-events-none -z-0 opacity-80" />

          {/* Official Verification Badge */}
          <div className="absolute top-5 left-5 z-20 flex flex-col gap-1.5 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#EAF5F0]/95 backdrop-blur-xs text-[#075E50] border border-[#D1E7DC] shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#087F68]" />
              {product?.brand || 'BLUSHU'} Official Packaging
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-xs text-[#202A26] border border-[#E3ECE7] shadow-xs">
              Batch: {product?.labelDetails?.packBatchCode || 'BAS001'}
            </span>
          </div>

          {/* Fullscreen Button */}
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-2.5 rounded-full bg-white/95 hover:bg-white text-[#202A26] border border-[#E3ECE7] shadow-sm transition-all hover:scale-105"
              aria-label="Fullscreen view"
              title="Click to view full screen"
            >
              <Maximize2 className="w-4 h-4 text-[#087F68]" />
            </button>
          </div>

          {/* Dynamic Interactive Image Stage */}
          <div
            className="w-full h-full p-8 sm:p-12 flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isHovered ? 'scale(2.2)' : 'scale(1)'
            }}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[360px] sm:max-h-[460px] w-auto object-contain drop-shadow-xl select-none pointer-events-none"
              fetchPriority="high"
            />
          </div>

          {/* Zoom Instruction Hint */}
          <div className={`absolute bottom-5 left-5 text-[11px] text-[#202A26] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#E3ECE7] pointer-events-none transition-opacity duration-300 flex items-center gap-1.5 shadow-xs ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}>
            <ZoomIn className="w-3.5 h-3.5 text-[#087F68]" />
            <span>Hover / move cursor to zoom in high detail</span>
          </div>

          {/* Active Loupe Zoom Mode Pill */}
          {isHovered && (
            <div className="absolute top-5 right-5 z-20 bg-[#202A26]/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full pointer-events-none shadow-sm flex items-center gap-1 animate-fade-in">
              <Eye className="w-3 h-3 text-[#A3E5D0]" />
              <span>2.2× High Definition Zoom</span>
            </div>
          )}
        </div>

        {/* Caption & Image Counter */}
        <div className="mt-3.5 px-1 flex items-center justify-between text-xs font-semibold text-[#69736E]">
          <span className="truncate pr-2">{currentImage.caption}</span>
          <span className="text-[11px] font-bold text-[#087F68] shrink-0 bg-[#EAF5F0] px-2 py-0.5 rounded-full">
            {selectedImageIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* 3. Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F8F8F3] hover:bg-[#EAF5F0] text-[#202A26] transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center p-4">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-h-[60vh] max-w-full object-contain drop-shadow-2xl"
              />
            </div>

            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={img.id || i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-16 h-16 rounded-xl p-1 border-2 bg-[#F8F8F3] shrink-0 overflow-hidden ${
                    selectedImageIndex === i ? 'border-[#087F68]' : 'border-transparent'
                  }`}
                >
                  <img src={img.src} alt="thumb" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
