'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';
import { getRecentArticles } from '@/lib/articles';

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const recentArticles = getRecentArticles(5);

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
    <aside className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">分類</h3>
        <ul className="space-y-2">
          {CATEGORIES.filter(c => c.slug !== 'all').map((cat) => (
            <li key={cat.slug}>
              <Link href={`/category/${cat.slug}`} className="text-sm text-[#DCA54A] hover:underline">
                {cat.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/category/sherryshare" className="text-sm text-[#DCA54A] hover:underline">
              選好物
            </Link>
          </li>
        </ul>
      </div>

      {/* Recent Articles */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">近期文章</h3>
        <ul className="space-y-3">
          {recentArticles.map((article) => (
            <li key={article.id}>
              <Link href={`/blog/${article.slug}`} className="text-sm text-[#DCA54A] hover:underline leading-snug block">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">用電子郵件訂閱網站</h3>
        <p className="text-xs text-gray-500 mb-3">輸入你的電子郵件地址訂閱網站的新文章，使用電子郵件接收新通知。</p>
        {subscribed ? (
          <p className="text-sm text-[#DCA54A]">感謝訂閱！</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="電子郵件地址"
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#DCA54A]"
              required
            />
            <button type="submit" className="bg-gray-900 text-white text-sm py-2 rounded hover:bg-gray-700 transition">
              訂閱
            </button>
          </form>
        )}
      </div>

      {/* Search */}
      <div>
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to start searching..."
            className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-[#DCA54A]"
          />
          <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-r hover:bg-gray-700 transition">
            搜尋
          </button>
        </div>
      </div>
    </aside>
  );
}
