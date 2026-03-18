'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('https://formspree.io/f/xpwdqkbr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `Contact from ${formData.name}` }),
      });
    } catch { /* ignore */ }
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">感謝您的來信！</h3>
        <p className="text-gray-600">我們會盡速與您聯繫。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#DCA54A]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company / Brand</label>
        <input
          type="text"
          required
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#DCA54A]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#DCA54A]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#DCA54A]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#DCA54A] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-[#6FA3EF] text-white font-medium px-8 py-3 rounded hover:bg-[#5A8FD9] transition text-sm disabled:opacity-50"
      >
        {submitting ? '提交中...' : '提交'}
      </button>
    </form>
  );
}
