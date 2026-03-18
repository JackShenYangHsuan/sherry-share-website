import Link from 'next/link';
import Image from 'next/image';
import { getCategoryLabel } from '@/lib/articles';
import type { Article } from '@/lib/articles';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <Link href={`/blog/${article.slug}`} className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-[10px] uppercase bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition"
            >
              {getCategoryLabel(cat)}
            </Link>
          ))}
        </div>
        <Link href={`/blog/${article.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 leading-snug line-clamp-2 hover:text-[#DCA54A] transition">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
        <Link
          href={`/blog/${article.slug}`}
          className="inline-block bg-black text-white text-sm font-medium px-5 py-2 rounded hover:bg-gray-800 transition self-start"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
