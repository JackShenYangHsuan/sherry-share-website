'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

const categoryLabelMap: Record<string, string> = {
  interview: '深度對話',
  'applied-psychology': '心理洞見',
  books: '好書推薦',
  sherryshare: '生活選物',
};

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function renderContent(content: string) {
  if (!content) return null;

  // Check if content is HTML
  if (content.includes('<')) {
    // Process HTML content: detect blockquotes for pull-quote styling
    const processed = content
      .replace(
        /<blockquote>([\s\S]*?)<\/blockquote>/gi,
        `<blockquote style="border-left: 3px solid ${TEAL}; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: ${TEAL}; font-family: 'DM Serif Display', serif; font-size: 1.15rem; line-height: 1.8;">$1</blockquote>`
      )
      .replace(
        /<h2>([\s\S]*?)<\/h2>/gi,
        `<h2 style="font-family: 'DM Serif Display', serif; font-size: 1.75rem; color: ${DARK}; margin-top: 2.5rem; margin-bottom: 1rem;">$1</h2>`
      )
      .replace(
        /<h3>([\s\S]*?)<\/h3>/gi,
        `<h3 style="font-family: 'DM Serif Display', serif; font-size: 1.35rem; color: ${DARK}; margin-top: 2rem; margin-bottom: 0.75rem;">$1</h3>`
      )
      .replace(
        /<p>([\s\S]*?)<\/p>/gi,
        `<p style="margin-bottom: 1.25rem; line-height: 1.9; color: #444;">$1</p>`
      )
      .replace(
        /<a\s/gi,
        `<a style="color: ${TEAL}; text-decoration: underline; text-underline-offset: 3px;" `
      )
      .replace(
        /<ul>/gi,
        `<ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; color: #444;">`
      )
      .replace(
        /<ol>/gi,
        `<ol style="list-style: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; color: #444;">`
      )
      .replace(
        /<li>/gi,
        `<li style="margin-bottom: 0.5rem; line-height: 1.8;">`
      )
      .replace(
        /<img\s/gi,
        `<img style="border-radius: 12px; margin: 2rem auto; max-width: 100%; height: auto;" `
      );

    return (
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: processed }}
      />
    );
  }

  // Plain text content: split by paragraphs
  const paragraphs = content.split('\n\n').filter(Boolean);
  return (
    <div className="article-content">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mb-5 leading-[1.9]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: '#444' }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

export default function Design3ArticleDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data: Article[]) => {
        const published = data.filter((a) => a.status === 'published');
        const found = published.find((a) => a.slug === slug);
        setArticle(found || null);

        if (found) {
          const others = published
            .filter((a) => a.slug !== slug)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
          setRelated(others);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: `${TEAL} transparent ${TEAL} transparent` }}
        />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1
          className="text-3xl mb-4"
          style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
        >
          找不到文章
        </h1>
        <Link
          href="/design3/blog"
          className="text-sm font-medium"
          style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
        >
          &larr; 返回探索
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Teal accent bar */}
      <div className="h-1" style={{ backgroundColor: TEAL }} />

      {/* Article header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto px-6 pt-12 md:pt-20"
      >
        {/* Category */}
        <div className="flex gap-2 mb-6">
          {article.categories?.map((c) => (
            <span
              key={c}
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
            >
              {categoryLabelMap[c] || c}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-8"
          style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
        >
          {article.title}
        </h1>

        {/* Author section */}
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm">
            <Image
              src="/images/sherry-portrait.webp"
              alt="Sherry"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <p
              className="text-sm font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif", color: DARK }}
            >
              Sherry 雪力
            </p>
            <p
              className="text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif", color: '#aaa' }}
            >
              {formatDate(article.date)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Featured image */}
      {article.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-4xl mx-auto px-6 mb-12"
        >
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        </motion.div>
      )}

      {/* Article content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-2xl mx-auto px-6 pb-16"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem' }}
      >
        {/* Excerpt as intro */}
        {article.excerpt && (
          <p
            className="text-lg md:text-xl leading-relaxed mb-10 pb-8 border-b border-gray-100"
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: '#555',
              fontStyle: 'italic',
            }}
          >
            {article.excerpt}
          </p>
        )}

        {/* Main content */}
        {renderContent(article.content)}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: '#f5f5f5',
                    color: '#888',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Related readings */}
      {related.length > 0 && (
        <section style={{ backgroundColor: SAND }} className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-2xl md:text-3xl mb-10"
              style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
            >
              繼續閱讀
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/design3/blog/${r.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {r.image && (
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex gap-2 mb-2">
                      {r.categories?.slice(0, 1).map((c) => (
                        <span
                          key={c}
                          className="text-xs font-medium"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: TEAL }}
                        >
                          {categoryLabelMap[c] || c}
                        </span>
                      ))}
                    </div>
                    <h3
                      className="text-base leading-snug transition-colors duration-200 group-hover:text-[#1B4B5A]"
                      style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
                    >
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
