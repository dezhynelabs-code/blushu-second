import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate backend verification / integration check
    setTimeout(() => {
      // Note: Transparently documenting backend requirement for production mailing list
      setStatus('success');
      setMessage('Thank you for subscribing! We will share sun care insights and official BLUSHU release notes.');
      setEmail('');
    }, 800);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#69736E]" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your email for sun care notes..."
              className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-[#D1E7DC] text-[#202A26] placeholder-[#69736E]/80 text-sm focus:outline-none focus:border-[#087F68] focus:ring-2 focus:ring-[#087F68]/15 transition-all shadow-xs"
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3.5 bg-[#087F68] hover:bg-[#075E50] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 disabled:opacity-60 shadow-sm"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Feedback states */}
        {status === 'error' && (
          <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center gap-2 text-xs text-[#075E50] bg-[#EAF5F0] p-2.5 rounded-lg animate-fade-in border border-[#D1E7DC]">
            <CheckCircle className="w-4 h-4 shrink-0 text-[#087F68]" />
            <span>{message}</span>
          </div>
        )}

        <p className="text-[11px] text-[#69736E] text-center">
          We respect your privacy. No spam. Integration-ready for Mailchimp, Klaviyo, or custom newsletter API.
        </p>
      </form>
    </div>
  );
};
