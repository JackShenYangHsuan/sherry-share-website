'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: '首頁', href: '/design2' },
  { label: '關於 Sherry', href: '/design2/about' },
  { label: '文章', href: '/design2/blog' },
  { label: '聯絡我們', href: '/design2/contact' },
];

function Design2Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/design2" className="group flex items-center gap-3">
            <span
              className="text-xl font-bold text-white tracking-[0.2em] group-hover:text-[#D4AF37] transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SHERRYSHARE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 tracking-wider uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/design2/contact"
              className="text-sm border border-[#D4AF37] text-[#D4AF37] px-5 py-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 tracking-wider"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              聯絡我們
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0A0A0A] border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors text-lg tracking-wider"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Design2Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('https://formspree.io/f/xpwdqkbr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, _subject: 'Newsletter Subscription' }),
      });
    } catch { /* ignore */ }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/20">
      {/* Gold divider line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand + Social */}
          <div>
            <h3
              className="text-lg font-bold text-white tracking-[0.2em] mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SHERRYSHARE
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              一個讓你更靠近自己的地方
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FaFacebook size={14} />, href: 'https://pse.is/SherrysNotesFB' },
                { icon: <FaInstagram size={14} />, href: 'https://pse.is/SherrysNotesIG' },
                { icon: <FaYoutube size={14} />, href: 'https://pse.is/SherrysNotesYT' },
                { icon: <FaPodcast size={14} />, href: 'https://pse.is/SherrysNotesPodcast' },
                { icon: <FaThreads size={14} />, href: 'https://pse.is/SherrysNotesThreads' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold text-[#D4AF37] tracking-[0.15em] mb-6 uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Quick Links
            </h3>
            <div className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-gray-500 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="text-sm font-semibold text-[#D4AF37] tracking-[0.15em] mb-6 uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Newsletter
            </h3>
            {subscribed ? (
              <p className="text-sm text-[#D4AF37]">感謝訂閱！</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent border border-white/10 border-r-0 text-white text-sm py-3 px-4 focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="text-sm bg-[#D4AF37] text-black px-5 py-3 font-semibold hover:bg-[#E5C04B] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    訂閱
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-gray-600">
            &copy; {new Date().getFullYear()} SherryShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Design2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
      `}</style>
      <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
        <Design2Header />
        <main className="flex-1 pt-20">{children}</main>
        <Design2Footer />
      </div>
    </>
  );
}
