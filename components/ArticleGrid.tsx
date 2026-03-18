'use client';

import { useState } from 'react';
import TabFilter from './TabFilter';
import ArticleCard from './ArticleCard';
import { getAllArticles, getArticlesByCategory } from '@/lib/articles';

export default function ArticleGrid() {
  const [activeTab, setActiveTab] = useState('all');
  const articles = activeTab === 'all' ? getAllArticles() : getArticlesByCategory(activeTab);

  return (
    <section className="py-16 px-4">
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
      </div>
    </section>
  );
}
