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

const categoryMap: Record<string, { label: string; subtitle: string; image: string }> = {
  interview: {
    label: '深度對話',
    subtitle: '與領域專家的心靈交流',
    image: '/images/article-murdock.webp',
  },
  'applied-psychology': {
    label: '心理洞見',
    subtitle: '用心理學解讀生活',
    image: '/images/article-change.jpg',
  },
  books: {
    label: '好書推薦',
    subtitle: '值得反覆閱讀的好書',
    image: '/images/category-books.jpg',
  },
  sherryshare: {
    label: '生活選物',
    subtitle: '用心挑選的好物推薦',
    image: '/images/category-lifestyle.jpg',
  },
};

const categoryColors = ['#1B4B5A', '#C4856A', '#7B9E89', '#A8896C'];

function ScrollReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Design3Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((a: Article) => a.status === 'published');
        setArticles(published);
      })
      .catch(console.error);
  }, []);

  // Get featured conversation (first interview article)
  const featuredConversation = articles.find((a) =>
    a.categories?.includes('interview')
  ) || articles[0];

  // Get insight articles
  const insightArticles = articles
    .filter((a) => a.categories?.includes('applied-psychology'))
    .slice(0, 4);

  // If not enough psychology articles, fill with others
  const displayInsights = insightArticles.length >= 2
    ? insightArticles
    : articles.filter((a) => a.slug !== featuredConversation?.slug).slice(0, 4);

  const [email, setEmail] = useState('');

  return (
    <div>
      {/* ========== HERO SECTION ========== */}
      <section className="min-h-[90vh] md:min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="order-2 md:order-1 pb-8 md:pb-0"
            >
              <div
                className="inline-block px-4 py-8 md:py-0 rounded-2xl"
              >
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
                >
                  你好，我是雪力
                </h1>
                <p
                  className="text-base md:text-lg mb-6"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL, fontWeight: 500, letterSpacing: '0.05em' }}
                >
                  組織心理學家・作家・自媒體創作者
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: '#666' }}
                >
                  歡迎來到我的世界。在這裡，我們一起探索如何在四十歲之後，活出更有深度的自己。
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/design3/about"
                    className="inline-flex items-center px-7 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                    style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: TEAL }}
                  >
                    認識我
                  </Link>
                  <Link
                    href="/design3/blog"
                    className="inline-flex items-center px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: TEAL,
                      border: `1.5px solid ${TEAL}`,
                    }}
                  >
                    開始探索
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right: Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="order-1 md:order-2 relative"
            >
              <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/sherry-portrait.webp"
                  alt="Sherry 雪力"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Soft overlay gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              {/* Decorative circle */}
              <div
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full -z-10 opacity-60"
                style={{ backgroundColor: SAND }}
              />
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full -z-10 opacity-40"
                style={{ backgroundColor: TEAL }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== MISSION STRIP ========== */}
      <section style={{ backgroundColor: TEAL }} className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p
              className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              讓每一天的選擇，成為自我成長的力量
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== MY WORLD SECTION ========== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2
                className="text-3xl md:text-4xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
              >
                我的世界
              </h2>
              <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: TEAL }} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(categoryMap).map(([key, cat], i) => (
              <ScrollReveal key={key} delay={i * 0.12}>
                <Link href="/design3/blog" className="group block">
                  <div className="relative mb-4">
                    {/* Colored circle behind */}
                    <div
                      className="absolute inset-2 rounded-full transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: categoryColors[i], opacity: 0.15 }}
                    />
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3
                          className="text-white text-lg font-medium"
                          style={{ fontFamily: "'DM Serif Display', serif" }}
                        >
                          {cat.label}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm text-center"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                  >
                    {cat.subtitle}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED CONVERSATION ========== */}
      {featuredConversation && (
        <section style={{ backgroundColor: SAND }} className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <h2
                className="text-3xl md:text-4xl mb-12"
                style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
              >
                最新對話
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
              <ScrollReveal delay={0.1}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  {featuredConversation.image && (
                    <Image
                      src={featuredConversation.image}
                      alt={featuredConversation.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 block"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
                  >
                    CONVERSATION
                  </span>
                  <h3
                    className="text-2xl md:text-3xl leading-snug mb-4"
                    style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
                  >
                    {featuredConversation.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: '#666' }}
                  >
                    {featuredConversation.excerpt}
                  </p>
                  <Link
                    href={`/design3/blog/${featuredConversation.slug}`}
                    className="inline-flex items-center text-sm font-medium transition-all duration-200 hover:gap-3 gap-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
                  >
                    繼續閱讀
                    <span className="text-lg">&rarr;</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* ========== INSIGHTS GRID ========== */}
      {displayInsights.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2
                    className="text-3xl md:text-4xl"
                    style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
                  >
                    心理洞見
                  </h2>
                  <p
                    className="mt-2 text-base"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                  >
                    用心理學的視角，重新理解生活
                  </p>
                </div>
                <Link
                  href="/design3/blog"
                  className="hidden md:inline-flex items-center text-sm font-medium gap-2 transition-all duration-200 hover:gap-3"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
                >
                  查看全部 <span>&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayInsights.slice(0, 4).map((article, i) => (
                <ScrollReveal key={article.id} delay={i * 0.1}>
                  <Link
                    href={`/design3/blog/${article.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
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
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: TEAL }}
                        >
                          {article.categories?.map((c) => categoryMap[c]?.label || c).join(', ') || '洞見'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3
                        className="text-xl mb-3 leading-snug transition-colors duration-200 group-hover:text-[#1B4B5A]"
                        style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
                      >
                        {article.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed line-clamp-2"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                      >
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link
                href="/design3/blog"
                className="inline-flex items-center text-sm font-medium gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
              >
                查看全部 <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========== ABOUT TEASER ========== */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-speaking.jpg"
            alt="Sherry speaking"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p
              className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-8"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              從哥倫比亞大學到自媒體創作，
              <br className="hidden md:block" />
              我的旅程是一段不斷重新定義自我的過程。
            </p>
            <Link
              href="/design3/about"
              className="inline-flex items-center text-sm font-medium text-white gap-2 border-b border-white/50 pb-1 transition-all duration-200 hover:border-white hover:gap-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              了解更多 <span>&rarr;</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section style={{ backgroundColor: SAND }} className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
            >
              一起成長
            </h2>
            <p
              className="text-base mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif", color: '#666' }}
            >
              每週收到來自雪力的心理學洞見與生活靈感
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full text-sm bg-white border-0 focus:outline-none focus:ring-2 shadow-sm"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: DARK,
                  focusRingColor: TEAL,
                } as React.CSSProperties}
              />
              <button
                className="px-8 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: TEAL }}
              >
                加入我們
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
