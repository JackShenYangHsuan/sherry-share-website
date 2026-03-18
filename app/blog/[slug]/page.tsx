'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import type { Article } from '@/lib/articles';

const CATEGORY_LABELS: Record<string, string> = {
  interview: '人物專訪',
  books: '讀好書',
  'applied-psychology': '應用心理學',
  'organizational-psychology': '組織心理學',
  sherryshare: '選好物',
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((articles: Article[]) => {
        const found = articles.find(a => a.slug === slug);
        setArticle(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse text-gray-400">載入中...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">找不到文章</h1>
        <Link href="/blog" className="text-[#DCA54A] hover:underline">← 返回文章列表</Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content */}
          <article>
            {/* Category & Tags */}
            {article.categories && article.categories.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span>📁</span>
                {article.categories.map((cat, i) => (
                  <span key={cat}>
                    <Link href={`/category/${cat}`} className="text-[#DCA54A] hover:underline">
                      {CATEGORY_LABELS[cat] || cat}
                    </Link>
                    {i < article.categories.length - 1 && ', '}
                  </span>
                ))}
              </div>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <span>#</span>
                {article.tags.map((tag, i) => (
                  <span key={tag}>
                    <Link href={`/blog?tag=${tag}`} className="text-[#DCA54A] hover:underline">
                      {tag}
                    </Link>
                    {i < article.tags.length - 1 && ', '}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-8">
              {article.title}
            </h1>

            {/* Featured Image */}
            {article.image && (
              <img src={article.image} alt={article.title} className="w-full rounded-lg mb-8" />
            )}

            {/* Content */}
            <div
              className="article-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />
          </article>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
