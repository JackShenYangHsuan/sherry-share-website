'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: FaPodcast, href: 'https://podcasts.apple.com', label: 'Podcast' },
  { icon: FaThreads, href: 'https://threads.net', label: 'Threads' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-28">
        <div className="grid md:grid-cols-2 gap-0 min-h-[600px] relative">
          {/* Vertical center divider (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-px h-2/3" style={{ backgroundColor: '#E8E2D8' }} />

          {/* ============ LEFT SIDE ============ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col justify-center py-12 md:py-20 md:pr-16 lg:pr-24"
          >
            <span
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
            >
              Get in Touch
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
            >
              聯繫我們
            </h1>
            <div className="h-px w-12 mb-8" style={{ backgroundColor: '#C4A265' }} />

            <p
              className="text-lg leading-relaxed mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: '#5A5347', fontStyle: 'italic', fontWeight: 400 }}
            >
              &ldquo;每一次連結，都是一個新故事的開始。&rdquo;
            </p>
            <p className="text-sm leading-loose mb-10" style={{ color: '#6B6358' }}>
              無論您是想討論合作機會、演講邀約、企業培訓，或是單純想分享您的想法，我都很期待收到您的來信。
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#C4A265' }} />
                <span className="text-sm" style={{ color: '#6B6358' }}>
                  hello@sherryshare.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#C4A265' }} />
                <span className="text-sm" style={{ color: '#6B6358' }}>
                  New York, USA
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ border: '1px solid #DDD5C8', color: '#9B9080' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C4A265';
                    e.currentTarget.style.color = '#C4A265';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DDD5C8';
                    e.currentTarget.style.color = '#9B9080';
                  }}
                  aria-label={s.label}
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ============ RIGHT SIDE - FORM ============ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col justify-center py-12 md:py-20 md:pl-16 lg:pl-24"
            style={{ borderLeft: 'none' }}
          >

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ backgroundColor: '#C4A265' }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#C4A265' }} />
                  <div className="h-px w-8" style={{ backgroundColor: '#C4A265' }} />
                </div>
                <h3
                  className="text-2xl mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
                >
                  感謝您的來信
                </h3>
                <p className="text-sm" style={{ color: '#8A8075' }}>
                  我會盡快回覆您。
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ color: '#9B9080', fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                  >
                    姓名
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-3 text-sm outline-none transition-colors duration-200"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid #DDD5C8',
                      color: '#3D3830',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C4A265')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#DDD5C8')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ color: '#9B9080', fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                  >
                    電子信箱
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-3 text-sm outline-none transition-colors duration-200"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid #DDD5C8',
                      color: '#3D3830',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C4A265')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#DDD5C8')}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ color: '#9B9080', fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                  >
                    主題
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-3 text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid #DDD5C8',
                      color: formData.subject ? '#3D3830' : '#B8B0A4',
                      fontFamily: "'Inter', sans-serif",
                      borderRadius: 0,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C4A265')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#DDD5C8')}
                  >
                    <option value="" disabled>請選擇...</option>
                    <option value="collaboration">合作提案</option>
                    <option value="speaking">演講邀約</option>
                    <option value="training">企業培訓</option>
                    <option value="media">媒體採訪</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ color: '#9B9080', fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                  >
                    訊息
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-3 text-sm outline-none transition-colors duration-200 resize-none"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid #DDD5C8',
                      color: '#3D3830',
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.8,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C4A265')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#DDD5C8')}
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
                    style={{
                      backgroundColor: '#C4A265',
                      color: '#FAF7F2',
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A68840')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C4A265')}
                  >
                    送出訊息
                  </button>
                </div>

                {/* Small note */}
                <p className="text-xs leading-relaxed" style={{ color: '#B8B0A4' }}>
                  您也可以直接寫信至 hello@sherryshare.com
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
