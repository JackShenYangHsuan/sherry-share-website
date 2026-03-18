'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Design2ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('https://formspree.io/f/xpwdqkbr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch { /* ignore */ }
    setSending(false);
    setSubmitted(true);
  };

  const socialLinks = [
    { icon: <FaFacebook size={16} />, href: 'https://pse.is/SherrysNotesFB', label: 'Facebook' },
    { icon: <FaInstagram size={16} />, href: 'https://pse.is/SherrysNotesIG', label: 'Instagram' },
    { icon: <FaYoutube size={16} />, href: 'https://pse.is/SherrysNotesYT', label: 'YouTube' },
    { icon: <FaPodcast size={16} />, href: 'https://pse.is/SherrysNotesPodcast', label: 'Podcast' },
    { icon: <FaThreads size={16} />, href: 'https://pse.is/SherrysNotesThreads', label: 'Threads' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <section className="pt-20 pb-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="h-[2px] w-12 bg-[#D4AF37]" />
            </div>
            <h1
              className="text-5xl md:text-7xl font-bold text-white tracking-wider mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Contact Us
            </h1>
            <p className="text-gray-500 text-lg">
              歡迎透過表單與我們聯繫，一起探索任何機會與可能性
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  感謝您的訊息
                </h2>
                <p className="text-gray-500">
                  我們已收到您的訊息，會盡快與您聯繫。
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    姓名 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white py-4 px-5 text-sm focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white py-4 px-5 text-sm focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    主旨
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white py-4 px-5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23D4AF37' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  >
                    <option value="">請選擇主旨</option>
                    <option value="speaking">演講邀約</option>
                    <option value="consulting">企業顧問</option>
                    <option value="media">媒體合作</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    訊息 *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white py-4 px-5 text-sm focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors duration-300 resize-none"
                    placeholder="請輸入您的訊息..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#D4AF37] text-black py-4 text-sm font-semibold tracking-[0.15em] uppercase hover:bg-[#E5C04B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {sending ? '傳送中...' : '送出訊息'}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <div className="w-12 h-12 mx-auto mb-4 border border-[#D4AF37]/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 tracking-wider uppercase mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Email</p>
                <p className="text-sm text-gray-400">hello@sherryshare.com</p>
              </div>

              <div>
                <div className="w-12 h-12 mx-auto mb-4 border border-[#D4AF37]/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 tracking-wider uppercase mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Location</p>
                <p className="text-sm text-gray-400">Taipei, Taiwan</p>
              </div>

              <div>
                <div className="w-12 h-12 mx-auto mb-4 border border-[#D4AF37]/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 tracking-wider uppercase mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Response</p>
                <p className="text-sm text-gray-400">2-3 個工作天</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sm text-gray-500 mb-6 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Follow Us
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
