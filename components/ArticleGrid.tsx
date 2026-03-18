'use client';

import { useState, useEffect } from 'react';
import TabFilter from './TabFilter';
import ArticleCard from './ArticleCard';
import ScrollReveal from './ScrollReveal';
import type { Article } from '@/lib/articles';

export default function ArticleGrid() {
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
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
        {articles.length === 0 && (
          <p className="text-center text-gray-400 py-12">此分類目前沒有文章。</p>
        )}
      </div>
    </section>
  );
}
