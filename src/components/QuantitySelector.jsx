import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({ quantity, onIncrease, onDecrease, max = 99, min = 1, size = 'default' }) => {
  const isSmall = size === 'sm';

  return (
    <div className={`inline-flex items-center border border-[#D1E7DC] bg-white rounded-lg select-none shadow-xs ${
      isSmall ? 'h-8' : 'h-11'
    }`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`flex items-center justify-center text-[#202A26] hover:text-[#087F68] hover:bg-[#EAF5F0] transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isSmall ? 'w-7 h-full' : 'w-10 h-full'
        }`}
        aria-label="Decrease quantity"
      >
        <Minus className={isSmall ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>

      <span className={`flex items-center justify-center font-semibold text-[#202A26] ${
        isSmall ? 'w-8 text-xs' : 'w-12 text-sm'
      }`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`flex items-center justify-center text-[#202A26] hover:text-[#087F68] hover:bg-[#EAF5F0] transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isSmall ? 'w-7 h-full' : 'w-10 h-full'
        }`}
        aria-label="Increase quantity"
      >
        <Plus className={isSmall ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>
    </div>
  );
};
