'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const TEAL = '#1B4B5A';
const SAND = '#E8DDD0';
const DARK = '#1a1a1a';

const navLinks = [
  { href: '/design3', label: '首頁' },
  { href: '/design3/about', label: '關於' },
  { href: '/design3/blog', label: '探索' },
  { href: '/design3/contact', label: '聯繫' },
];

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: FaPodcast, href: 'https://podcasts.apple.com', label: 'Podcast' },
  { icon: FaThreads, href: 'https://threads.net', label: 'Threads' },
];

function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    if (!scrolled) {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/design3" className="flex-shrink-0">
            <span
              className="text-xl md:text-2xl tracking-wide"
              style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
            >
              雪力 <span className="text-base" style={{ color: TEAL }}>Sherry</span>
            </span>
          </Link>

          {/* Desktop nav center */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/design3' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm tracking-wide transition-colors duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    color: isActive ? TEAL : '#555',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5"
                      style={{ backgroundColor: TEAL }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Social icons right */}
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:opacity-70"
                style={{ color: '#999' }}
                aria-label={s.label}
              >
                <s.icon size={14} />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 rounded"
              style={{ backgroundColor: DARK }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 rounded"
              style={{ backgroundColor: DARK }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 rounded"
              style={{ backgroundColor: DARK }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg tracking-wide"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    color: pathname === link.href ? TEAL : '#555',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-5 mt-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#999' }}
                    aria-label={s.label}
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer style={{ backgroundColor: TEAL }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand + tagline */}
          <div>
            <Link href="/design3">
              <span
                className="text-2xl tracking-wide text-white"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                雪力 Sherry
              </span>
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.7)' }}
            >
              組織心理學家・作家・自媒體創作者
              <br />
              讓每一天的選擇，成為自我成長的力量。
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-200 hover:opacity-100"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-widest text-white mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              快速連結
            </h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.6)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter mini form */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-widest text-white mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              訂閱電子報
            </h4>
            <p
              className="text-sm mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.6)' }}
            >
              每週收到來自雪力的心理學洞見與生活靈感
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-white/50 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: SAND,
                  color: DARK,
                }}
              >
                訂閱
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t text-center text-xs"
          style={{
            borderColor: 'rgba(255,255,255,0.15)',
            fontFamily: "'DM Sans', sans-serif",
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          &copy; {new Date().getFullYear()} SherryShare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Design3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
        rel="stylesheet"
      />
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
