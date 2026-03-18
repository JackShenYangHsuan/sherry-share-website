'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch('/api/articles')
      .then((res) => res.json())
      .then((data: Article[]) => {
        const found = data.find((a) => a.slug === slug);
        setArticle(found || null);

        if (found) {
          const related = data
            .filter(
              (a) =>
                a.slug !== slug &&
                a.status === 'published' &&
                a.categories?.some((c) => found.categories?.includes(c))
            )
            .slice(0, 3);
          setRelatedArticles(related.length > 0 ? related : data.filter((a) => a.slug !== slug && a.status === 'published').slice(0, 3));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
        <div
          className="w-8 h-8 border border-t-transparent rounded-full animate-spin"
          style={{ borderColor: '#C4A265', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
        <h1
          className="text-3xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824' }}
        >
          找不到文章
        </h1>
        <Link
          href="/design1/blog"
          className="text-sm tracking-wider"
          style={{ color: '#C4A265' }}
        >
          &larr; 返回文章列表
        </Link>
      </div>
    );
  }

  // Process content: add drop cap to first paragraph
  const renderContent = () => {
    if (!article.content) {
      return (
        <p className="text-base leading-relaxed" style={{ color: '#5A5347' }}>
          {article.excerpt}
        </p>
      );
    }

    return (
      <div
        className="design1-article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      {/* ============ TOP IMAGE ============ */}
      {article.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
          style={{ maxHeight: '60vh', overflow: 'hidden' }}
        >
          <div className="relative w-full" style={{ height: '60vh' }}>
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(250,247,242,0.9) 0%, transparent 50%)' }}
            />
          </div>
        </motion.div>
      )}

      {/* ============ ARTICLE CONTENT ============ */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Main content */}
          <motion.article
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`${article.image ? '-mt-24 relative z-10' : 'mt-16 md:mt-24'}`}>
              {/* Category + Date */}
              <div className="flex items-center gap-4 mb-4">
                {article.categories?.[0] && (
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase"
                    style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                  >
                    {article.categories[0]}
                  </span>
                )}
                <span className="text-xs" style={{ color: '#B8B0A4' }}>
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 500 }}
              >
                {article.title}
              </h1>

              {/* Author line */}
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px flex-1" style={{ backgroundColor: '#E8E2D8' }} />
                <span className="text-xs tracking-wider" style={{ color: '#9B9080', fontFamily: "'Montserrat', sans-serif" }}>
                  by {article.author}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: '#E8E2D8' }} />
              </div>

              {/* Excerpt as lead */}
              {article.excerpt && (
                <p
                  className="text-lg leading-relaxed mb-10 pb-10"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#5A5347',
                    fontStyle: 'italic',
                    borderBottom: '1px solid #E8E2D8',
                  }}
                >
                  {article.excerpt}
                </p>
              )}

              {/* Article body with drop cap */}
              <style jsx global>{`
                .design1-article-content {
                  font-family: 'Inter', sans-serif;
                  color: #4A4440;
                  font-size: 1rem;
                  line-height: 1.9;
                }
                .design1-article-content > p:first-of-type::first-letter {
                  font-family: 'Playfair Display', serif;
                  float: left;
                  font-size: 4.5rem;
                  line-height: 0.75;
                  padding-right: 0.6rem;
                  padding-top: 0.35rem;
                  color: #C4A265;
                  font-weight: 500;
                }
                .design1-article-content p {
                  margin-bottom: 1.5rem;
                }
                .design1-article-content h2 {
                  font-family: 'Playfair Display', serif;
                  font-size: 1.75rem;
                  font-weight: 500;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                  color: #2C2824;
                }
                .design1-article-content h3 {
                  font-family: 'Playfair Display', serif;
                  font-size: 1.35rem;
                  font-weight: 500;
                  margin-top: 2rem;
                  margin-bottom: 0.75rem;
                  color: #2C2824;
                }
                .design1-article-content blockquote {
                  border-left: 3px solid #C4A265;
                  padding: 1rem 0 1rem 1.5rem;
                  margin: 2rem 0;
                  font-family: 'Playfair Display', serif;
                  font-style: italic;
                  font-size: 1.15rem;
                  color: #5A5347;
                  background: transparent;
                }
                .design1-article-content a {
                  color: #C4A265;
                  text-decoration: underline;
                  text-underline-offset: 3px;
                }
                .design1-article-content a:hover {
                  color: #A68840;
                }
                .design1-article-content img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 6px;
                  margin: 2rem 0;
                }
                .design1-article-content ul {
                  list-style-type: disc;
                  padding-left: 1.5rem;
                  margin-bottom: 1.5rem;
                }
                .design1-article-content ol {
                  list-style-type: decimal;
                  padding-left: 1.5rem;
                  margin-bottom: 1.5rem;
                }
                .design1-article-content li {
                  margin-bottom: 0.5rem;
                }
                .design1-article-content strong {
                  font-weight: 600;
                  color: #2C2824;
                }
                .design1-article-content hr {
                  border: none;
                  height: 1px;
                  background: #E8E2D8;
                  margin: 2.5rem 0;
                }
              `}</style>

              {renderContent()}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8" style={{ borderTop: '1px solid #E8E2D8' }}>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{
                          border: '1px solid #DDD5C8',
                          color: '#8A8075',
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Back link */}
              <div className="mt-12 mb-16">
                <Link
                  href="/design1/blog"
                  className="text-sm tracking-wider inline-flex items-center gap-2 transition-colors duration-200"
                  style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#A68840')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#C4A265')}
                >
                  <span>&larr;</span> 返回文章列表
                </Link>
              </div>
            </div>
          </motion.article>

          {/* ============ SIDEBAR ============ */}
          <motion.aside
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="lg:sticky lg:top-8 pt-16 lg:pt-24">
              <h3
                className="text-sm tracking-[0.2em] uppercase mb-6"
                style={{ color: '#9B9080', fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              >
                相關文章
              </h3>
              <div className="h-px mb-6" style={{ backgroundColor: '#E8E2D8' }} />

              <div className="space-y-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/design1/blog/${related.slug}`}
                    className="group block"
                  >
                    <div className="flex gap-4 items-start">
                      {related.image && (
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-sm">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-sm leading-snug mb-1 line-clamp-2 group-hover:opacity-70 transition-opacity"
                          style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 500 }}
                        >
                          {related.title}
                        </h4>
                        <span className="text-[10px]" style={{ color: '#B8B0A4' }}>
                          {related.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Decorative element */}
              <div className="mt-10 pt-8" style={{ borderTop: '1px solid #E8E2D8' }}>
                <div className="text-center">
                  <span
                    className="text-3xl"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#E8E2D8', fontStyle: 'italic' }}
                  >
                    S
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
