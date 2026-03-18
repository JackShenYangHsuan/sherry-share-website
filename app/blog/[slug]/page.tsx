'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import ReadingProgress from '@/components/ReadingProgress';
import type { Article } from '@/lib/articles';

const CATEGORY_LABELS: Record<string, string> = {
  interview: '人物專訪',
  books: '讀好書',
  'applied-psychology': '應用心理學',
  'organizational-psychology': '組織心理學',
  sherryshare: '選好物',
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((articles: Article[]) => {
        const published = articles.filter(a => a.status === 'published');
        const found = published.find(a => a.slug === slug);
        setArticle(found || null);

        // Get related articles (same category, excluding current)
        if (found) {
          const related = published
            .filter(a => a.slug !== slug && a.categories?.some(c => found.categories?.includes(c)))
            .slice(0, 3);
          // If not enough related by category, fill with recent
          if (related.length < 3) {
            const more = published
              .filter(a => a.slug !== slug && !related.find(r => r.slug === a.slug))
              .slice(0, 3 - related.length);
            related.push(...more);
          }
          setRelatedArticles(related);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse text-gray-400">載入中...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">找不到文章</h1>
        <Link href="/blog" className="text-[#DCA54A] hover:underline">← 返回文章列表</Link>
      </div>
    );
  }

  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <>
      <ReadingProgress />

      {/* Hero Image */}
      {article.image && (
        <motion.div
          className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
        </motion.div>
      )}

      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Article header — overlapping the hero image */}
          <motion.div
            className={article.image ? '-mt-24 relative z-10' : 'pt-8'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <div className="bg-white rounded-t-2xl pt-8 px-4 md:px-0 max-w-4xl mx-auto lg:mx-0">
              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-4">
                {article.categories && article.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat}`}
                    className="text-xs uppercase tracking-wider bg-[#DCA54A]/10 text-[#DCA54A] px-3 py-1 rounded-full hover:bg-[#DCA54A]/20 transition font-medium"
                  >
                    {CATEGORY_LABELS[cat] || cat}
                  </Link>
                ))}
                {formattedDate && (
                  <span className="text-xs text-gray-400">{formattedDate}</span>
                )}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="hover:text-[#DCA54A] transition"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              {/* Title */}
              <h1
                className="text-3xl md:text-[2.5rem] font-bold text-gray-900 leading-tight mb-6"
                style={{ fontFamily: "'Noto Serif TC', 'Georgia', serif" }}
              >
                {article.title}
              </h1>

              {/* Author line */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image
                    src="/images/sherry-portrait.webp"
                    alt="Sherry"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sherry 雪力</p>
                  <p className="text-xs text-gray-400">{formattedDate}</p>
                </div>
              </div>

              {/* Content with enhanced typography */}
              <div
                className="article-content-enhanced"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
              />
            </motion.article>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <Sidebar />
            </motion.div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.section
              className="mt-20 pt-12 border-t border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">推薦閱讀</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related, i) => (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
                  >
                    <Link href={`/blog/${related.slug}`} className="group block">
                      <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
                        <Image
                          src={related.image || '/images/category-books.jpg'}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex gap-2 mb-2">
                        {related.categories?.slice(0, 2).map((cat) => (
                          <span key={cat} className="text-[10px] uppercase text-[#DCA54A] font-medium tracking-wider">
                            {CATEGORY_LABELS[cat] || cat}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#DCA54A] transition-colors duration-300">
                        {related.title}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </>
  );
}
