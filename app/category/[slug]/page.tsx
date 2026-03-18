import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import { getArticlesByCategory, getCategoryLabel } from '@/lib/articles';

const VALID_CATEGORIES = ['interview', 'books', 'applied-psychology', 'organizational-psychology', 'sherryshare', 'food', 'wellness'];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = getCategoryLabel(slug);
  return { title: label };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID_CATEGORIES.includes(slug)) notFound();

  const articles = getArticlesByCategory(slug);
  const label = getCategoryLabel(slug);

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{label}</h1>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 py-12 text-center">此分類目前沒有文章。</p>
        )}
      </div>
    </div>
  );
}
