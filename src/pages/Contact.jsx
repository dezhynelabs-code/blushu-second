import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-left">
      <div className="max-w-2xl mb-12 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
          Customer Support & Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202A26] tracking-tight">
          Get in Touch with BLUSHU
        </h1>
        <p className="text-sm text-[#69736E] leading-relaxed">
          Have questions about Aqua Crystal Sunshield Clear Gel, order tracking, or wholesale? We're here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E3ECE7] space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#202A26] border-b border-[#E3ECE7] pb-3">
              Official Contact Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#EAF5F0] text-[#087F68] rounded-xl shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#202A26]">Customer Care Email</strong>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-[#087F68] hover:underline">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#EAF5F0] text-[#087F68] rounded-xl shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#202A26]">Helpline Phone</strong>
                  <span className="text-[#69736E]">{siteConfig.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#EAF5F0] text-[#087F68] rounded-xl shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#202A26]">Operating Hours</strong>
                  <span className="text-[#69736E]">{siteConfig.contact.supportHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#EAF5F0] text-[#087F68] rounded-xl shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#202A26]">Office Location</strong>
                  <span className="text-[#69736E]">{siteConfig.contact.registeredOffice}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#EAF5F0]/60 rounded-2xl border border-[#D1E7DC] text-xs text-[#075E50] space-y-1">
            <strong>Order Inquiries:</strong>
            <p className="text-[#69736E]">
              Please include your <code>Order ID</code> (e.g. BLU-2026-XXXX) for expedited shipping status responses.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E3ECE7] shadow-sm">
          <h3 className="text-lg font-bold text-[#202A26] mb-6">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#202A26] mb-1">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Patel"
                  className="w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border border-[#E3ECE7] rounded-xl focus:outline-none focus:border-[#087F68]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202A26] mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ananya@example.com"
                  className="w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border border-[#E3ECE7] rounded-xl focus:outline-none focus:border-[#087F68]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202A26] mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Product Question / Order Support"
                className="w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border border-[#E3ECE7] rounded-xl focus:outline-none focus:border-[#087F68]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202A26] mb-1">Message *</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can our sun care team help you today?"
                className="w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border border-[#E3ECE7] rounded-xl focus:outline-none focus:border-[#087F68]"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {status === 'success' && (
              <div className="flex items-center gap-2 text-xs text-[#075E50] bg-[#EAF5F0] p-3 rounded-xl border border-[#D1E7DC]">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#087F68]" />
                <span>Your message has been sent successfully. Our team will get back to you shortly.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3.5 bg-[#087F68] hover:bg-[#075E50] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
