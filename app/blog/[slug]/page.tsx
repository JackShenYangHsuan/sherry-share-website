import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug, getCategoryLabel } from '@/lib/articles';
import Sidebar from '@/components/Sidebar';
import type { Article } from '@/lib/articles';

// Revalidate every 60 seconds so new Supabase articles show up
export const revalidate = 60;

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

async function getArticle(slug: string): Promise<Article | undefined> {
  // Try local data first (for statically built articles)
  const local = getArticleBySlug(slug);
  if (local) return local;

  // Fallback: fetch from API (covers Supabase-created articles)
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles`, { next: { revalidate: 60 } });
    const articles: Article[] = await res.json();
    return articles.find(a => a.slug === slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Article Not Found' };
  return { title: article.title };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content */}
          <article>
            {/* Category & Tags */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>📁</span>
              {article.categories.map((cat, i) => (
                <span key={cat}>
                  <Link href={`/category/${cat}`} className="text-[#DCA54A] hover:underline">
                    {getCategoryLabel(cat)}
                  </Link>
                  {i < article.categories.length - 1 && ', '}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span>#</span>
              {article.tags.map((tag, i) => (
                <span key={tag}>
                  <Link href={`/blog?tag=${tag}`} className="text-[#DCA54A] hover:underline">
                    {tag}
                  </Link>
                  {i < article.tags.length - 1 && ', '}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-8">
              {article.title}
            </h1>

            {/* Content */}
            <div
              className="article-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
