'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/articles';

const ADMIN_PASSWORD = 'sherry2025';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_auth');
    if (saved === 'true') setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetch('/api/articles')
        .then(res => res.json())
        .then(data => setArticles(data))
        .catch(() => {});
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('密碼錯誤');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除這篇文章嗎？')) return;
    await fetch('/api/articles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  if (!authenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="輸入管理密碼"
            className="w-full border border-gray-300 rounded px-4 py-2.5 mb-4 focus:outline-none focus:border-[#DCA54A]"
          />
          <button className="w-full bg-[#DCA54A] text-black font-medium py-2.5 rounded hover:bg-[#C4933E] transition">
            登入
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">文章管理</h1>
          <Link
            href="/admin/edit/new"
            className="bg-[#DCA54A] text-black font-medium px-6 py-2.5 rounded hover:bg-[#C4933E] transition text-sm"
          >
            + 新增文章
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">標題</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">分類</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">狀態</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">日期</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">
                    {article.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {article.categories.join(', ')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {article.status === 'published' ? '已發布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{article.date}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      href={`/admin/edit/${article.slug}`}
                      className="text-sm text-[#DCA54A] hover:underline"
                    >
                      編輯
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {articles.length === 0 && (
            <p className="text-center text-gray-400 py-12">目前沒有文章。</p>
          )}
        </div>
      </div>
    </div>
  );
}
