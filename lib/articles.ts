import articlesData from '@/data/articles.json';

export interface Article {
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

export function getAllArticles(): Article[] {
  return (articlesData as Article[]).filter(a => a.status === 'published').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return (articlesData as Article[]).find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'all') return getAllArticles();
  return getAllArticles().filter(a => a.categories.includes(category));
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter(a => a.tags.includes(tag));
}

export function getRecentArticles(count: number = 5): Article[] {
  return getAllArticles().slice(0, count);
}

export function getCategoryLabel(slug: string): string {
  const labels: Record<string, string> = {
    interview: '人物專訪',
    books: '讀好書',
    'applied-psychology': '應用心理學',
    'organizational-psychology': '組織心理學',
    sherryshare: '選好物',
  };
  return labels[slug] || slug;
}
