import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqItems } from '../data/faq';

export const FAQAccordion = ({ items = faqItems, title = 'Frequently Asked Questions', subtitle = 'Clear, evidence-backed answers to your sunscreen questions.' }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {title && (
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5F0] text-[#075E50] text-xs font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Product & UV Knowledge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202A26] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-[#69736E] max-w-lg mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.id || idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[#087F68]/50 bg-white shadow-sm'
                  : 'border-[#E3ECE7] bg-white/70 hover:border-[#D1E7DC] hover:bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 select-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold text-[#202A26]">
                  {item.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#EAF5F0] text-[#087F68]' : 'bg-[#F8F8F3] text-[#69736E]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#69736E] leading-relaxed border-t border-[#EAF5F0]/60 animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
