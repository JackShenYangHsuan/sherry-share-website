'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCategoryLabel } from '@/lib/articles';
import type { Article } from '@/lib/articles';

export default function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="group border border-gray-100 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-xl hover:border-[#DCA54A]/30 transition-all duration-400"
    >
      <Link href={`/blog/${article.slug}`} className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={article.image || '/images/category-books.jpg'}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-[10px] uppercase bg-black text-white px-2 py-1 rounded hover:bg-[#DCA54A] hover:text-black transition-colors duration-200"
            >
              {getCategoryLabel(cat)}
            </Link>
          ))}
        </div>
        <Link href={`/blog/${article.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-[#DCA54A] transition-colors duration-300">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
        <Link
          href={`/blog/${article.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-[#DCA54A] transition-colors duration-200 self-start group/link"
        >
          Read More
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
