'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

const TEAL = '#1B4B5A';
const SAND = '#E8DDD0';
const DARK = '#1a1a1a';

function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: FaPodcast, href: 'https://podcasts.apple.com', label: 'Podcast' },
  { icon: FaThreads, href: 'https://threads.net', label: 'Threads' },
];

export default function Design3ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: SAND }}>
      {/* ========== HEADER ========== */}
      <section className="pt-12 md:pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
            >
              一起合作
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", color: '#666' }}
            >
              無論是演講邀約、企業合作或媒體採訪，歡迎與我聯繫
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== FORM + INFO ========== */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-4 rounded-xl text-center"
                      style={{ backgroundColor: `${TEAL}10` }}
                    >
                      <p
                        className="text-sm font-medium"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
                      >
                        感謝你的來信！我會盡快回覆你。
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: '#555' }}
                        >
                          姓名
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full px-5 py-3.5 rounded-xl text-sm border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: DARK,
                            '--tw-ring-color': TEAL,
                          } as React.CSSProperties}
                          placeholder="你的名字"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: '#555' }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full px-5 py-3.5 rounded-xl text-sm border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: DARK,
                            '--tw-ring-color': TEAL,
                          } as React.CSSProperties}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: '#555' }}
                      >
                        主題
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-5 py-3.5 rounded-xl text-sm border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 appearance-none"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: formData.subject ? DARK : '#999',
                          '--tw-ring-color': TEAL,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                        } as React.CSSProperties}
                      >
                        <option value="" disabled>
                          請選擇合作類型
                        </option>
                        <option value="speaking">演講邀約</option>
                        <option value="corporate">企業合作</option>
                        <option value="media">媒體採訪</option>
                        <option value="workshop">工作坊</option>
                        <option value="other">其他</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: '#555' }}
                      >
                        訊息
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="w-full px-5 py-3.5 rounded-xl text-sm border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: DARK,
                          '--tw-ring-color': TEAL,
                        } as React.CSSProperties}
                        placeholder="請告訴我更多關於你的需求..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        backgroundColor: TEAL,
                      }}
                    >
                      送出訊息
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.15}>
                <div className="space-y-8">
                  {/* Warm intro */}
                  <div>
                    <p
                      className="text-base leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: '#666' }}
                    >
                      我很期待聽到你的想法。無論是一個合作構想，或只是想打個招呼，都歡迎你來信。
                    </p>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${TEAL}15` }}
                      >
                        <FaEnvelope size={16} style={{ color: TEAL }} />
                      </div>
                      <div>
                        <h4
                          className="text-sm font-medium mb-1"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: DARK }}
                        >
                          Email
                        </h4>
                        <p
                          className="text-sm"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                        >
                          hello@sherryshare.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${TEAL}15` }}
                      >
                        <FaMapMarkerAlt size={16} style={{ color: TEAL }} />
                      </div>
                      <div>
                        <h4
                          className="text-sm font-medium mb-1"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: DARK }}
                        >
                          地點
                        </h4>
                        <p
                          className="text-sm"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                        >
                          台灣・台北
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social links */}
                  <div>
                    <h4
                      className="text-sm font-medium mb-4"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: DARK }}
                    >
                      在社群上找到我
                    </h4>
                    <div className="flex gap-3">
                      {socialLinks.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                          style={{ backgroundColor: TEAL }}
                          aria-label={s.label}
                        >
                          <s.icon size={16} className="text-white" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Collaboration types */}
                  <div
                    className="p-6 rounded-2xl"
                    style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                  >
                    <h4
                      className="text-sm font-medium mb-4"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: DARK }}
                    >
                      合作形式
                    </h4>
                    <ul className="space-y-2.5">
                      {[
                        '企業演講與培訓',
                        'MBTI / 性格評估工作坊',
                        '媒體專欄與採訪',
                        '品牌合作與代言',
                        'Podcast 來賓邀請',
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: '#666' }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: TEAL }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
