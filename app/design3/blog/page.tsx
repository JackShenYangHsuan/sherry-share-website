'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const TEAL = '#1B4B5A';
const SAND = '#E8DDD0';
const DARK = '#1a1a1a';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  image: string;
  date: string;
  author: string;
  status: string;
  content: string;
}

const categoryTabs = [
  { key: 'all', label: '全部' },
  { key: 'interview', label: '深度對話' },
  { key: 'applied-psychology', label: '心理洞見' },
  { key: 'books', label: '好書推薦' },
  { key: 'sherryshare', label: '生活選物' },
];

const categoryLabelMap: Record<string, string> = {
  interview: '深度對話',
  'applied-psychology': '心理洞見',
  books: '好書推薦',
  sherryshare: '生活選物',
};

function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export default function Design3BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((a: Article) => a.status === 'published');
        setArticles(published);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    activeTab === 'all'
      ? articles
      : articles.filter((a) => a.categories?.includes(activeTab));

  return (
    <div className="min-h-screen bg-white">
      {/* ========== HEADER ========== */}
      <section className="pt-12 md:pt-20 pb-12" style={{ backgroundColor: SAND }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
            >
              探索與洞見
            </h1>
            <p
              className="text-lg md:text-xl"
              style={{ fontFamily: "'DM Sans', sans-serif", color: '#666' }}
            >
              心理學、生活智慧與深度對話
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== FILTER TABS ========== */}
      <section className="border-b border-gray-100 sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 -mb-px scrollbar-hide">
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: activeTab === tab.key ? TEAL : 'transparent',
                  color: activeTab === tab.key ? '#fff' : '#888',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ARTICLES GRID ========== */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div
                className="inline-block w-8 h-8 border-2 rounded-full animate-spin"
                style={{ borderColor: `${TEAL} transparent ${TEAL} transparent` }}
              />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-lg"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#999' }}
              >
                目前沒有相關文章
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* First article: full width featured */}
              {filtered[0] && (
                <ScrollReveal>
                  <Link
                    href={`/design3/blog/${filtered[0].slug}`}
                    className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                    style={{ backgroundColor: '#fafafa' }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                        {filtered[0].image && (
                          <Image
                            src={filtered[0].image}
                            alt={filtered[0].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex gap-2 mb-4">
                          {filtered[0].categories?.map((c) => (
                            <span
                              key={c}
                              className="px-3 py-1 rounded-full text-xs font-medium text-white"
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                backgroundColor: TEAL,
                              }}
                            >
                              {categoryLabelMap[c] || c}
                            </span>
                          ))}
                        </div>
                        <h2
                          className="text-2xl md:text-3xl mb-4 leading-snug transition-colors duration-200 group-hover:text-[#1B4B5A]"
                          style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
                        >
                          {filtered[0].title}
                        </h2>
                        <p
                          className="text-base leading-relaxed mb-6 line-clamp-3"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                        >
                          {filtered[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: '#bbb' }}
                          >
                            {formatDate(filtered[0].date)}
                          </span>
                          <span
                            className="text-sm font-medium flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
                          >
                            閱讀更多 <span>&rarr;</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )}

              {/* Remaining articles: alternating grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filtered.slice(1).map((article, i) => (
                  <ScrollReveal key={article.id} delay={i * 0.08}>
                    <Link
                      href={`/design3/blog/${article.slug}`}
                      className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white h-full"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {article.image && (
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {article.categories?.map((c) => (
                            <span
                              key={c}
                              className="px-3 py-1 rounded-full text-xs font-medium text-white"
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                backgroundColor: TEAL,
                              }}
                            >
                              {categoryLabelMap[c] || c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3
                          className="text-lg md:text-xl mb-3 leading-snug transition-colors duration-200 group-hover:text-[#1B4B5A]"
                          style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
                        >
                          {article.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed line-clamp-2 mb-4"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                        >
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: '#bbb' }}
                          >
                            {formatDate(article.date)}
                          </span>
                          <span
                            className="text-sm font-medium flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
                          >
                            閱讀 <span>&rarr;</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
