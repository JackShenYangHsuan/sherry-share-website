'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
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

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Design2ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((articles: Article[]) => {
        const published = articles.filter((a) => a.status === 'published');
        const found = published.find((a) => a.slug === slug);
        setArticle(found || null);
        setRecentArticles(published.filter((a) => a.slug !== slug).slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-500 text-lg"
        >
          載入中...
        </motion.div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          找不到文章
        </h1>
        <Link
          href="/design2/blog"
          className="text-[#D4AF37] hover:underline text-sm tracking-wider uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          &larr; 返回文章列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Image */}
      {article.image && (
        <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <motion.div style={{ y: heroImageY }} className="absolute inset-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[130%] object-cover"
            />
          </motion.div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/30 to-transparent" />

          {/* Title overlay at bottom */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute bottom-0 left-0 right-0 pb-12 px-6"
          >
            <div className="max-w-4xl mx-auto">
              {/* Categories */}
              {article.categories && article.categories.length > 0 && (
                <div className="flex gap-3 mb-4">
                  {article.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-[#D4AF37] text-black text-[10px] font-semibold px-3 py-1 tracking-wider uppercase"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {CATEGORY_LABELS[cat] || cat}
                    </span>
                  ))}
                </div>
              )}

              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {article.title}
              </h1>

              <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
                <span>{article.author}</span>
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                <span>{article.date}</span>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Content Area */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            {/* Main Content */}
            <FadeIn>
              <article>
                {/* If no hero image, show title here */}
                {!article.image && (
                  <div className="mb-12">
                    {article.categories && article.categories.length > 0 && (
                      <div className="flex gap-3 mb-4">
                        {article.categories.map((cat) => (
                          <span
                            key={cat}
                            className="bg-[#D4AF37] text-black text-[10px] font-semibold px-3 py-1 tracking-wider uppercase"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {CATEGORY_LABELS[cat] || cat}
                          </span>
                        ))}
                      </div>
                    )}
                    <h1
                      className="text-3xl md:text-5xl font-bold text-white leading-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {article.title}
                    </h1>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <span>{article.author}</span>
                      <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                      <span>{article.date}</span>
                    </div>
                    <div className="h-[1px] w-16 bg-[#D4AF37] mt-8" />
                  </div>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 border border-white/10 px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Article Content */}
                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-white
                    prose-p:text-gray-300 prose-p:leading-relaxed
                    prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-blockquote:border-l-[#D4AF37] prose-blockquote:text-gray-400
                    prose-img:rounded-none
                    prose-hr:border-white/10"
                  dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />

                {/* Bottom navigation */}
                <div className="mt-16 pt-8 border-t border-white/10">
                  <Link
                    href="/design2/blog"
                    className="inline-flex items-center gap-2 text-[#D4AF37] text-sm tracking-wider uppercase hover:gap-4 transition-all duration-300"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    &larr; 返回文章列表
                  </Link>
                </div>
              </article>
            </FadeIn>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <FadeIn delay={0.2}>
                <div className="sticky top-28">
                  <div className="border-l-2 border-[#D4AF37] pl-6">
                    <h3
                      className="text-sm text-[#D4AF37] tracking-[0.2em] uppercase mb-6"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Recent Articles
                    </h3>

                    <div className="space-y-6">
                      {recentArticles.map((a) => (
                        <Link
                          key={a.id}
                          href={`/design2/blog/${a.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-4">
                            {a.image && (
                              <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                                <img
                                  src={a.image}
                                  alt={a.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm text-white font-medium leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                                {a.title}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1">{a.date}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Gold accent decoration */}
                  <div className="mt-12 p-6 border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                    <p className="text-sm text-gray-400 italic leading-relaxed">
                      &ldquo;唯有深入了解自己與組織運作的核心動能，才能真正突破限制。&rdquo;
                    </p>
                    <p className="text-xs text-[#D4AF37] mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      &mdash; Sherry Hsia
                    </p>
                  </div>
                </div>
              </FadeIn>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
