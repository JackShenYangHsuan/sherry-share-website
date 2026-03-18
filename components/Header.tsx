'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Logo + Social */}
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              SherryShare
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://pse.is/SherrysNotesFB" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition"><FaFacebook size={18} /></a>
            <a href="https://pse.is/SherrysNotesIG" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition"><FaInstagram size={18} /></a>
            <a href="https://pse.is/SherrysNotesYT" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition"><FaYoutube size={18} /></a>
            <a href="https://pse.is/SherrysNotesPodcast" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition"><FaPodcast size={18} /></a>
            <a href="https://pse.is/SherrysNotesThreads" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition"><FaThreads size={18} /></a>
          </div>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 pb-3">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => 'children' in item ? setOpenDropdown(item.label) : null}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#DCA54A] transition py-2"
              >
                {item.label}
                {'children' in item && <HiChevronDown size={14} />}
              </Link>
              {'children' in item && openDropdown === item.label && (
                <div className="absolute top-full left-0 bg-white border border-gray-100 rounded-lg shadow-lg py-2 min-w-[180px] z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      target={'external' in child ? '_blank' : undefined}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#DCA54A] transition"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm font-medium text-gray-700"
                  onClick={() => !('children' in item) && setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {'children' in item && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block py-1.5 text-sm text-gray-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <a href="https://pse.is/SherrysNotesFB" target="_blank" rel="noopener noreferrer" className="text-gray-600"><FaFacebook size={18} /></a>
              <a href="https://pse.is/SherrysNotesIG" target="_blank" rel="noopener noreferrer" className="text-gray-600"><FaInstagram size={18} /></a>
              <a href="https://pse.is/SherrysNotesYT" target="_blank" rel="noopener noreferrer" className="text-gray-600"><FaYoutube size={18} /></a>
              <a href="https://pse.is/SherrysNotesPodcast" target="_blank" rel="noopener noreferrer" className="text-gray-600"><FaPodcast size={18} /></a>
              <a href="https://pse.is/SherrysNotesThreads" target="_blank" rel="noopener noreferrer" className="text-gray-600"><FaThreads size={18} /></a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
