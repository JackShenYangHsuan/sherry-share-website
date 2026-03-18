'use client';

import { useState, useEffect } from 'react';
import TabFilter from '@/components/TabFilter';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import type { Article } from '@/lib/articles';
import { TAGS } from '@/lib/constants';

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        setAllArticles(data.filter(a => a.status === 'published'));
      })
      .catch(() => {});
  }, []);

  const articles = activeTab === 'all'
    ? allArticles
    : allArticles.filter(a => a.categories?.includes(activeTab));

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        {articles.length === 0 && (
          <p className="text-center text-gray-400 py-12">此分類目前沒有文章。</p>
        )}

        {/* Tag Cloud */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">依標籤篩選文章</h3>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="text-sm text-[#DCA54A] hover:underline"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
