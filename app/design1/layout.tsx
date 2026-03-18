'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/design1', label: '首頁' },
  { href: '/design1/blog', label: '文章' },
  { href: '/design1/about', label: '關於' },
  { href: '/design1/contact', label: '聯繫' },
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

  return (
    <header className="relative z-50">
      {/* Top social bar */}
      <div className="border-b" style={{ borderColor: '#E8E2D8', backgroundColor: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: '#9B9080' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C4A265')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9B9080')}
                aria-label={s.label}
              >
                <s.icon size={14} />
              </a>
            ))}
          </div>
          <span className="text-xs tracking-wide" style={{ color: '#9B9080', fontFamily: "'Montserrat', sans-serif" }}>
            用心生活的藝術
          </span>
        </div>
      </div>

      {/* Logo */}
      <div className="py-8 text-center" style={{ backgroundColor: '#FAF7F2' }}>
        <Link href="/design1">
          <h1
            className="text-4xl md:text-5xl tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
          >
            SherryShare
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="border-t border-b" style={{ borderColor: '#E8E2D8', backgroundColor: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Desktop nav */}
          <div className="hidden md:flex justify-center gap-12 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/design1' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-[0.25em] uppercase transition-colors duration-200"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    color: isActive ? '#C4A265' : '#5A5347',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C4A265')}
                  onMouseLeave={(e) => {
                    const active = pathname === link.href || (link.href !== '/design1' && pathname.startsWith(link.href));
                    e.currentTarget.style.color = active ? '#C4A265' : '#5A5347';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex justify-center py-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-px transition-all" style={{ backgroundColor: '#5A5347' }} />
              <span className="block w-6 h-px transition-all" style={{ backgroundColor: '#5A5347' }} />
              <span className="block w-4 h-px transition-all" style={{ backgroundColor: '#5A5347' }} />
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
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: '#E8E2D8', backgroundColor: '#FAF7F2' }}
            >
              <div className="flex flex-col items-center gap-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      color: pathname === link.href ? '#C4A265' : '#5A5347',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: '#FAF7F2' }}>
      {/* Gold divider */}
      <div className="max-w-xs mx-auto">
        <div className="h-px" style={{ backgroundColor: '#C4A265' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        {/* Logo */}
        <Link href="/design1">
          <span
            className="text-2xl tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824' }}
          >
            SherryShare
          </span>
        </Link>

        {/* Social icons */}
        <div className="flex justify-center gap-5 mt-6">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: '#9B9080' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C4A265')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9B9080')}
              aria-label={s.label}
            >
              <s.icon size={16} />
            </a>
          ))}
        </div>

        {/* Nav links */}
        <div className="flex justify-center flex-wrap gap-6 mt-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-wider uppercase transition-colors duration-200"
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#9B9080' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C4A265')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9B9080')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-8 text-xs" style={{ color: '#B8B0A4', fontFamily: "'Montserrat', sans-serif" }}>
          &copy; {new Date().getFullYear()} SherryShare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Design1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#FAF7F2' }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
