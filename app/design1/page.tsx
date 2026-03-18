'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const staggerChildren = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { staggerChildren: 0.12 },
};

const categories = [
  { name: '人物專訪', subtitle: 'People & Stories', image: '/images/category-food.jpg' },
  { name: '應用心理學', subtitle: 'Applied Psychology', image: '/images/category-wellness.jpg' },
  { name: '組織心理學', subtitle: 'Org Psychology', image: '/images/category-lifestyle.jpg' },
  { name: '讀好書', subtitle: 'Book Reviews', image: '/images/category-books.jpg' },
];

export default function Design1Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);

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

  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 4);

  return (
    <div style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#FAF7F2', minHeight: '85vh' }}>
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <h1
                className="text-5xl md:text-7xl lg:text-8xl leading-none tracking-wide mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
              >
                Sherry
                <br />
                <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Share</span>
              </h1>
              <div className="h-px w-16 mb-6" style={{ backgroundColor: '#C4A265' }} />
              <p
                className="text-xl md:text-2xl mb-2 tracking-wider"
                style={{ fontFamily: "'Playfair Display', serif", color: '#5A5347', fontWeight: 400 }}
              >
                用心生活的藝術
              </p>
              <p
                className="text-sm mt-4 leading-relaxed max-w-md"
                style={{ color: '#8A8075', fontFamily: "'Inter', sans-serif" }}
              >
                這是一個用心嘗試新事物、體驗美好、並且誠實分享給你的地方。
              </p>

              {/* Scroll indicator */}
              <motion.div
                className="mt-16 flex flex-col items-start"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <span className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#B8B0A4' }}>
                  Scroll
                </span>
                <div className="w-px h-10" style={{ backgroundColor: '#C4A265' }} />
              </motion.div>
            </motion.div>

            {/* Right portrait with offset gold frame */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="relative max-w-md mx-auto">
                {/* Offset gold border frame */}
                <div
                  className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 w-full h-full rounded-sm"
                  style={{ border: '1px solid #C4A265' }}
                />
                <div className="relative z-10 overflow-hidden rounded-sm">
                  <Image
                    src="/images/sherry-portrait.webp"
                    alt="Sherry"
                    width={500}
                    height={650}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PHILOSOPHY STRIP ============ */}
      <section className="py-20" style={{ backgroundColor: '#F5F0E8' }}>
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto px-6 text-center">
          {/* Gold divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-12" style={{ backgroundColor: '#C4A265' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#C4A265' }} />
            <div className="h-px w-12" style={{ backgroundColor: '#C4A265' }} />
          </div>

          <blockquote>
            <p
              className="text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif", color: '#3D3830', fontStyle: 'italic', fontWeight: 400 }}
            >
              &ldquo;過了四十歲以後，我發現自己的價值觀悄悄改變了。&rdquo;
            </p>
            <footer className="mt-6">
              <span className="text-sm tracking-[0.15em]" style={{ color: '#C4A265' }}>
                &mdash; Sherry
              </span>
            </footer>
          </blockquote>
        </motion.div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
            >
              Categories
            </span>
            <h2
              className="text-3xl md:text-4xl mt-3"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
            >
              探索主題
            </h2>
          </motion.div>

          <motion.div {...staggerChildren} className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-10">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/design1/blog?category=${encodeURIComponent(cat.name)}`}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-md aspect-[4/3]">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60 opacity-40"
                        style={{ background: 'linear-gradient(to top, rgba(44,40,36,0.8), transparent)' }}
                      />
                    </div>
                    <div className="mt-4">
                      <h3
                        className="text-lg md:text-xl"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824' }}
                      >
                        {cat.name}
                      </h3>
                      <p
                        className="text-xs tracking-wider mt-1"
                        style={{ color: '#9B9080', fontFamily: "'Inter', sans-serif" }}
                      >
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURED ARTICLE ============ */}
      {loaded && featuredArticle && (
        <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0E8' }}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div {...fadeInUp}>
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
              >
                Featured
              </span>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-10 md:gap-16 mt-8 items-center">
              {/* Image — 60% */}
              <motion.div
                className="md:col-span-3 relative overflow-hidden rounded-md"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {featuredArticle.image && (
                  <Link href={`/design1/blog/${featuredArticle.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </Link>
                )}
              </motion.div>

              {/* Text — 40% */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <div className="h-px w-12 mb-6" style={{ backgroundColor: '#C4A265' }} />
                {featuredArticle.categories?.[0] && (
                  <span
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {featuredArticle.categories[0]}
                  </span>
                )}
                <h3
                  className="text-2xl md:text-3xl mt-3 mb-4 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 500 }}
                >
                  <Link href={`/design1/blog/${featuredArticle.slug}`} className="hover:opacity-80 transition-opacity">
                    {featuredArticle.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B6358' }}>
                  {featuredArticle.excerpt}
                </p>
                <Link
                  href={`/design1/blog/${featuredArticle.slug}`}
                  className="text-sm tracking-wider transition-colors duration-200 inline-flex items-center gap-2"
                  style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#A68840')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#C4A265')}
                >
                  閱讀更多
                  <span className="text-lg">&rarr;</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ============ RECENT ARTICLES ============ */}
      {loaded && recentArticles.length > 0 && (
        <section className="py-20 md:py-28" style={{ backgroundColor: '#FAF7F2' }}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
              >
                Latest
              </span>
              <h2
                className="text-3xl md:text-4xl mt-3"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
              >
                最新文章
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {recentArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group"
                >
                  {article.image && (
                    <Link href={`/design1/blog/${article.slug}`}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md mb-5">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="h-px w-full mb-4" style={{ backgroundColor: '#E8E2D8' }} />
                  {article.categories?.[0] && (
                    <span
                      className="text-[10px] tracking-[0.25em] uppercase"
                      style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                    >
                      {article.categories[0]}
                    </span>
                  )}
                  <h3
                    className="text-lg mt-2 mb-2 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 500 }}
                  >
                    <Link
                      href={`/design1/blog/${article.slug}`}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: '#8A8075' }}>
                    {article.excerpt}
                  </p>
                  <span className="text-xs" style={{ color: '#B8B0A4' }}>
                    {article.date}
                  </span>
                </motion.article>
              ))}
            </div>

            <motion.div {...fadeInUp} className="text-center mt-14">
              <Link
                href="/design1/blog"
                className="inline-block px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
                style={{
                  border: '1px solid #C4A265',
                  color: '#C4A265',
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
                查看所有文章
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ============ ABOUT STRIP ============ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left pull quote */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <p
                className="text-2xl md:text-3xl leading-relaxed"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#3D3830',
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                &ldquo;我是夏瑄澧，一個在美國生活了超過二十年的台灣人。我想透過分享，把那些讓我感動的事物帶給你。&rdquo;
              </p>
              <div className="flex gap-4 mt-10">
                <Link
                  href="/design1/about"
                  className="px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-sm"
                  style={{
                    backgroundColor: '#C4A265',
                    color: '#FAF7F2',
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A68840')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C4A265')}
                >
                  關於雪力
                </Link>
                <Link
                  href="/design1/blog"
                  className="px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-sm"
                  style={{
                    border: '1px solid #C4A265',
                    color: '#C4A265',
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
                  閱讀文章
                </Link>
              </div>
            </motion.div>

            {/* Right portrait */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative"
            >
              <div className="relative max-w-sm mx-auto md:ml-auto md:mr-0">
                <div
                  className="absolute -left-4 -top-4 md:-left-6 md:-top-6 w-full h-full rounded-sm"
                  style={{ border: '1px solid #C4A265' }}
                />
                <Image
                  src="/images/sherry-hero-consultant.webp"
                  alt="Sherry portrait"
                  width={420}
                  height={560}
                  className="relative z-10 w-full h-auto object-cover rounded-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAF7F2' }}>
        <motion.div {...fadeInUp} className="max-w-xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12" style={{ backgroundColor: '#C4A265' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#C4A265' }} />
            <div className="h-px w-12" style={{ backgroundColor: '#C4A265' }} />
          </div>

          <h2
            className="text-2xl md:text-3xl mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
          >
            訂閱雪力的心理學筆記
          </h2>
          <p className="text-sm mb-8" style={{ color: '#8A8075' }}>
            每週收到最新的文章、心理學觀點與生活靈感
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 text-sm rounded-sm outline-none transition-all duration-200"
              style={{
                border: '1px solid #DDD5C8',
                backgroundColor: 'transparent',
                color: '#3D3830',
                fontFamily: "'Inter', sans-serif",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#C4A265')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#DDD5C8')}
            />
            <button
              type="submit"
              className="px-8 py-3 text-xs tracking-[0.15em] uppercase rounded-sm transition-all duration-300"
              style={{
                border: '1px solid #C4A265',
                color: '#C4A265',
                backgroundColor: 'transparent',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
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
              訂閱
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
