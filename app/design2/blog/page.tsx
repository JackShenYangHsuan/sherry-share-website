'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

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
  status: 'published' | 'draft';
  content: string;
}

const CATEGORIES = [
  { slug: 'all', label: '所有文章' },
  { slug: 'interview', label: '人物專訪' },
  { slug: 'applied-psychology', label: '應用心理學' },
  { slug: 'organizational-psychology', label: '組織心理學' },
  { slug: 'books', label: '讀好書' },
];

const CATEGORY_LABELS: Record<string, string> = {
  interview: '人物專訪',
  books: '讀好書',
  'applied-psychology': '應用心理學',
  'organizational-psychology': '組織心理學',
  sherryshare: '選好物',
};

function FadeInCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Design2BlogPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data: Article[]) => {
        setAllArticles(data.filter((a) => a.status === 'published'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const articles =
    activeTab === 'all'
      ? allArticles
      : allArticles.filter((a) => a.categories?.includes(activeTab));

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Page Header */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-6xl md:text-8xl font-bold text-white tracking-wider mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              文章
            </h1>
            <div className="h-1 w-20 bg-[#D4AF37]" />
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveTab(cat.slug)}
                className={`px-6 py-2.5 text-sm tracking-wider transition-all duration-300 rounded-full ${
                  activeTab === cat.slug
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'bg-transparent border border-white/10 text-gray-500 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#1A1A1A] animate-pulse">
                  <div className="aspect-[16/10] bg-[#2A2A2A]" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-16 bg-[#2A2A2A] rounded" />
                    <div className="h-5 w-3/4 bg-[#2A2A2A] rounded" />
                    <div className="h-4 w-full bg-[#2A2A2A] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-20 text-lg"
            >
              此分類目前沒有文章。
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <FadeInCard key={article.id} delay={i * 0.05}>
                  <Link
                    href={`/design2/blog/${article.slug}`}
                    className="group block bg-[#1A1A1A] border border-transparent hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-50" />
                      {/* Category tag */}
                      {article.categories?.[0] && (
                        <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-[10px] font-semibold px-3 py-1 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {CATEGORY_LABELS[article.categories[0]] || article.categories[0]}
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <h3
                        className="text-lg font-semibold text-white leading-snug mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {article.title}
                      </h3>

                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">{article.date}</span>
                        <span
                          className="text-xs text-[#D4AF37] tracking-wider uppercase group-hover:tracking-widest transition-all duration-300"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Read More &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeInCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
