'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { CONTACT_INFO } from '@/lib/constants';

export default function Footer() {
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
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#0B0B0B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Brand + Social */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-6">SHERRYSHARE.COM</h3>
            <div className="flex items-center gap-4 mb-8">
              <a href="https://pse.is/SherrysNotesFB" target="_blank" rel="noopener noreferrer" className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"><FaFacebook size={16} /></a>
              <a href="https://pse.is/SherrysNotesIG" target="_blank" rel="noopener noreferrer" className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"><FaInstagram size={16} /></a>
              <a href="https://pse.is/SherrysNotesYT" target="_blank" rel="noopener noreferrer" className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"><FaYoutube size={16} /></a>
              <a href="https://pse.is/SherrysNotesPodcast" target="_blank" rel="noopener noreferrer" className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"><FaPodcast size={16} /></a>
              <a href="https://pse.is/SherrysNotesThreads" target="_blank" rel="noopener noreferrer" className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"><FaThreads size={16} /></a>
            </div>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-400 hover:text-white transition">關於SherryShare.com</Link>
              <Link href="/about" className="block text-sm text-gray-400 hover:text-white transition">關於雪力 Sherry</Link>
            </div>
          </div>

          {/* Column 2: Visit Us */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-6">VISIT US</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{CONTACT_INFO.address}</p>
              <p>{CONTACT_INFO.phone}</p>
              <p>{CONTACT_INFO.email}</p>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider mb-6">訂閱最新文章</h3>
            {subscribed ? (
              <p className="text-sm text-[#DCA54A]">感謝訂閱！</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-1 bg-transparent border-b border-gray-600 text-white text-sm py-2 px-1 focus:outline-none focus:border-[#DCA54A] placeholder-gray-500"
                    required
                  />
                  <button
                    type="submit"
                    className="text-sm text-gray-400 hover:text-white border-b border-gray-600 py-2 px-4 transition"
                  >
                    訂閱
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">請輸入你的E-Mail，按下訂閱，最新內容不漏接！</p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-gray-500">
            © 2025 雪力的心理學筆記. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
