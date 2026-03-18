'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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

const CATEGORY_LABELS: Record<string, string> = {
  interview: '人物專訪',
  books: '讀好書',
  'applied-psychology': '應用心理學',
  'organizational-psychology': '組織心理學',
  sherryshare: '選好物',
};

/* ───────────── Fade-in wrapper ───────────── */
function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════ HERO ═══════════════ */
function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Background image with parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0"
      >
        <img
          src="/images/sherry-portrait.webp"
          alt="Sherry"
          className="w-full h-[120%] object-cover object-top"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
      </motion.div>

      {/* Hero text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Gold accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-[2px] bg-[#D4AF37] mb-8"
            />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-[0.15em] leading-none mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SHERRY
              <br />
              SHARE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-gray-400 mt-6 tracking-wider"
            >
              一個讓你更靠近自己的地方
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-10 flex gap-4"
            >
              <Link
                href="/design2/blog"
                className="group inline-flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 text-sm font-semibold tracking-wider hover:bg-[#E5C04B] transition-all duration-300"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                探索文章
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/design2/about"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                關於雪力
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════ MARQUEE ═══════════════ */
function CategoryMarquee() {
  const categories = ['人物專訪', '應用心理學', '組織心理學', '讀好書', '選好物', '生活選物', '健康生活', '飲食'];
  const doubled = [...categories, ...categories];

  return (
    <section className="py-12 bg-[#0A0A0A] overflow-hidden border-y border-white/5">
      <div className="relative">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
          className="flex gap-12 whitespace-nowrap"
        >
          {doubled.map((cat, i) => (
            <span
              key={i}
              className="text-5xl md:text-7xl font-bold tracking-wider"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                WebkitTextStroke: '1px rgba(212, 175, 55, 0.3)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════ FEATURED ARTICLE ═══════════════ */
function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-[#D4AF37]" />
            <span
              className="text-sm text-[#D4AF37] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Featured
            </span>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <Link href={`/design2/blog/${article.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Gold category badge */}
              {article.categories?.[0] && (
                <span className="absolute top-6 left-6 bg-[#D4AF37] text-black text-xs font-semibold px-4 py-1.5 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {CATEGORY_LABELS[article.categories[0]] || article.categories[0]}
                </span>
              )}
            </div>

            {/* Text */}
            <div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 group-hover:text-[#D4AF37] transition-colors duration-300"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {article.title}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 line-clamp-3">
                {article.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-[#D4AF37] text-sm tracking-wider uppercase group-hover:gap-4 transition-all duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Read More
                <span className="text-lg">&rarr;</span>
              </span>
            </div>
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════ ARTICLES GRID ═══════════════ */
function ArticlesGrid({ articles }: { articles: Article[] }) {
  return (
    <section className="py-24 bg-[#0E0E0E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
                <span className="text-sm text-[#D4AF37] tracking-[0.3em] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Latest
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                最新文章
              </h2>
            </div>
            <Link
              href="/design2/blog"
              className="hidden md:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D4AF37] transition-colors tracking-wider uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              View All &rarr;
            </Link>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <FadeInSection key={article.id} delay={i * 0.1}>
              <Link
                href={`/design2/blog/${article.slug}`}
                className="group block bg-[#1A1A1A] hover:border-[#D4AF37]/50 border border-transparent transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  {/* Gold divider */}
                  <div className="h-[1px] w-8 bg-[#D4AF37] mb-4 group-hover:w-16 transition-all duration-500" />

                  {/* Category */}
                  {article.categories?.[0] && (
                    <span className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase mb-3 block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {CATEGORY_LABELS[article.categories[0]] || article.categories[0]}
                    </span>
                  )}

                  <h3
                    className="text-lg font-semibold text-white leading-snug mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  <span className="text-xs text-gray-600">{article.date}</span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="mt-12 text-center md:hidden">
          <Link
            href="/design2/blog"
            className="inline-flex items-center gap-2 text-sm text-[#D4AF37] tracking-wider uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            View All Articles &rarr;
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════ ABOUT TEASER ═══════════════ */
function AboutTeaser() {
  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <FadeInSection>
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                <span className="text-[#D4AF37]">一</span>個讓你更靠近
                <br />
                自己的地方
              </h2>

              <div className="h-[1px] w-16 bg-[#D4AF37] mb-8" />

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                透過心理學的視角，探索自我、理解他人。在這裡，你會找到關於人際關係、職場成長、與內在探索的深度內容。
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/design2/about"
                  className="inline-flex items-center gap-2 border border-[#D4AF37] text-[#D4AF37] px-8 py-3 text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  認識雪力
                </Link>
                <Link
                  href="/design2/contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-gray-400 px-8 py-3 text-sm tracking-wider hover:border-white hover:text-white transition-all duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  合作邀約
                </Link>
              </div>
            </div>
          </FadeInSection>

          {/* Right: Image with gold accent */}
          <FadeInSection delay={0.2}>
            <div className="relative">
              {/* Gold border accent - offset */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#D4AF37]/30" />
              <div className="relative overflow-hidden">
                <img
                  src="/images/sherry-hero-consultant.webp"
                  alt="Sherry"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ QUOTE STRIP ═══════════════ */
function QuoteStrip() {
  return (
    <section className="py-24 bg-[#0E0E0E] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeInSection>
          <div className="flex justify-center mb-8">
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
          </div>
          <blockquote
            className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed italic"
          >
            &ldquo;光靠努力是不夠的，唯有深入了解自己，才能真正突破限制。&rdquo;
          </blockquote>
          <p className="mt-8 text-sm text-[#D4AF37] tracking-[0.2em] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            &mdash; Sherry Hsia
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════ NEWSLETTER ═══════════════ */
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('https://formspree.io/f/xpwdqkbr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, _subject: 'Newsletter Subscription' }),
      });
    } catch { /* ignore */ }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeInSection>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            加入我們
          </h2>
          <p className="text-gray-500 mb-10">
            訂閱電子報，第一時間收到最新文章與活動消息。
          </p>

          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#D4AF37] text-lg"
            >
              感謝訂閱！我們會將最新內容送到您的信箱。
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-[#D4AF37]/30 text-white py-4 px-6 text-sm focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-[#D4AF37] text-black px-8 py-4 text-sm font-semibold tracking-wider hover:bg-[#E5C04B] transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                訂閱
              </button>
            </form>
          )}
        </FadeInSection>
      </div>
    </section>
  );
}

/* ═══════════════ HOMEPAGE ═══════════════ */
export default function Design2HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data: Article[]) => {
        setArticles(data.filter((a) => a.status === 'published'));
      })
      .catch(() => {});
  }, []);

  const featured = articles[0];
  const gridArticles = articles.slice(1, 7);

  return (
    <>
      <HeroSection />
      <CategoryMarquee />
      {featured && <FeaturedArticle article={featured} />}
      {gridArticles.length > 0 && <ArticlesGrid articles={gridArticles} />}
      <AboutTeaser />
      <QuoteStrip />
      <NewsletterSection />
    </>
  );
}
