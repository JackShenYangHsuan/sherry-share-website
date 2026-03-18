'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import type { Article } from '@/lib/articles';

const CATEGORY_LABELS: Record<string, string> = {
  interview: '人物專訪',
  books: '讀好書',
  'applied-psychology': '應用心理學',
  'organizational-psychology': '組織心理學',
  sherryshare: '選好物',
  food: '飲食',
  wellness: '健康生活',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        setArticles(
          data.filter(a => a.status === 'published' && a.categories?.includes(slug))
        );
      })
      .catch(() => {});
  }, [slug]);

  const label = CATEGORY_LABELS[slug] || slug;

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{label}</h1>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 py-12 text-center">此分類目前沒有文章。</p>
        )}
      </div>
    </div>
  );
}
