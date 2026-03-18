'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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

const categoryFilters = ['所有文章', '人物專訪', '應用心理學', '組織心理學', '讀好書'];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeFilter, setActiveFilter] = useState('所有文章');
  const [loaded, setLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((a: Article) => a.status === 'published');
        setArticles(published);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const filtered =
    activeFilter === '所有文章'
      ? articles
      : articles.filter((a) => a.categories?.includes(activeFilter));

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      {/* ============ HEADER ============ */}
      <section className="pt-16 md:pt-24 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
          >
            Journal
          </span>
          <h1
            className="text-4xl md:text-6xl mt-3 mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
          >
            文章
          </h1>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ backgroundColor: '#C4A265' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#C4A265' }} />
            <div className="h-px w-16" style={{ backgroundColor: '#C4A265' }} />
          </div>
        </motion.div>
      </section>

      {/* ============ FILTERS ============ */}
      <section className="pb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto px-6"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setVisibleCount(8);
                }}
                className="px-5 py-2 text-xs tracking-wider rounded-full transition-all duration-300"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  backgroundColor: activeFilter === cat ? '#C4A265' : 'transparent',
                  color: activeFilter === cat ? '#FAF7F2' : '#7A7268',
                  border: `1px solid ${activeFilter === cat ? '#C4A265' : '#DDD5C8'}`,
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== cat) {
                    e.currentTarget.style.borderColor = '#C4A265';
                    e.currentTarget.style.color = '#C4A265';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== cat) {
                    e.currentTarget.style.borderColor = '#DDD5C8';
                    e.currentTarget.style.color = '#7A7268';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============ ARTICLES ============ */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-6">
          {!loaded && (
            <div className="text-center py-20">
              <div className="inline-block w-6 h-6 border border-t-transparent rounded-full animate-spin" style={{ borderColor: '#C4A265', borderTopColor: 'transparent' }} />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loaded && displayed.length === 0 && (
                <p className="text-center py-20 text-sm" style={{ color: '#9B9080' }}>
                  目前沒有文章
                </p>
              )}

              <div className="space-y-16 md:space-y-20">
                {displayed.map((article, i) => {
                  const isEven = i % 2 === 1;

                  return (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, delay: 0.05 }}
                    >
                      <div
                        className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${
                          isEven ? 'md:direction-rtl' : ''
                        }`}
                      >
                        {/* Image */}
                        <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
                          {article.image ? (
                            <Link href={`/design1/blog/${article.slug}`}>
                              <div className="relative aspect-[4/3] overflow-hidden rounded-md group">
                                <Image
                                  src={article.image}
                                  alt={article.title}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                              </div>
                            </Link>
                          ) : (
                            <div
                              className="aspect-[4/3] rounded-md flex items-center justify-center"
                              style={{ backgroundColor: '#EDE8DE' }}
                            >
                              <span
                                className="text-4xl"
                                style={{ fontFamily: "'Playfair Display', serif", color: '#C4A265', opacity: 0.4 }}
                              >
                                S
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                          {article.categories?.[0] && (
                            <span
                              className="text-[10px] tracking-[0.25em] uppercase"
                              style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                            >
                              {article.categories[0]}
                            </span>
                          )}
                          <h2
                            className="text-xl md:text-2xl mt-2 mb-3 leading-snug"
                            style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 500 }}
                          >
                            <Link
                              href={`/design1/blog/${article.slug}`}
                              className="hover:opacity-70 transition-opacity"
                            >
                              {article.title}
                            </Link>
                          </h2>
                          <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: '#6B6358' }}>
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <Link
                              href={`/design1/blog/${article.slug}`}
                              className="text-sm tracking-wider inline-flex items-center gap-2 transition-colors duration-200"
                              style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#A68840')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = '#C4A265')}
                            >
                              閱讀全文 <span className="text-base">&rarr;</span>
                            </Link>
                            <span className="text-xs" style={{ color: '#B8B0A4' }}>
                              {article.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Thin divider between articles */}
                      {i < displayed.length - 1 && (
                        <div className="mt-16 md:mt-20 flex justify-center">
                          <div className="h-px w-32" style={{ backgroundColor: '#DDD5C8' }} />
                        </div>
                      )}
                    </motion.article>
                  );
                })}
              </div>

              {/* Load more */}
              {hasMore && (
                <motion.div {...fadeInUp} className="text-center mt-16">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
                    style={{
                      border: '1px solid #C4A265',
                      color: '#C4A265',
                      backgroundColor: 'transparent',
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#C4A265';
                      e.currentTarget.style.color = '#FAF7F2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#C4A265';
                    }}
                  >
                    載入更多
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
