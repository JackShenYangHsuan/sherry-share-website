import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Fallback to local JSON if Supabase is not configured
const USE_SUPABASE = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function getLocalArticles() {
  const fs = await import('fs');
  const path = await import('path');
  const DATA_FILE = path.join(process.cwd(), 'data', 'articles.json');
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function writeLocalArticles(articles: unknown[]) {
  const fs = await import('fs');
  const path = await import('path');
  const DATA_FILE = path.join(process.cwd(), 'data', 'articles.json');
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');
}

export async function GET() {
  if (USE_SUPABASE) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }
  const articles = await getLocalArticles();
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newArticle = {
    id: body.id || Date.now().toString(),
    slug: body.slug,
    title: body.title,
    excerpt: body.excerpt || '',
    categories: body.categories || [],
    tags: body.tags || [],
    image: body.image || '',
    date: body.date || new Date().toISOString().split('T')[0],
    author: body.author || 'Sherry',
    status: body.status || 'draft',
    content: body.content || '',
  };

  if (USE_SUPABASE) {
    const { data, error } = await supabase.from('articles').insert(newArticle).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  }

  const articles = await getLocalArticles();
  articles.push(newArticle);
  await writeLocalArticles(articles);
  return NextResponse.json(newArticle, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  if (USE_SUPABASE) {
    const { tags, ...updateData } = body;
    if (tags) updateData.tags = tags;
    updateData.updated_at = new Date().toISOString();
    const { data, error } = await supabase
      .from('articles')
      .update(updateData)
      .eq('slug', body.slug)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const articles = await getLocalArticles();
  const index = articles.findIndex((a: { slug: string }) => a.slug === body.slug);
  if (index === -1) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  articles[index] = { ...articles[index], ...body, tags: body.tags || articles[index].tags };
  await writeLocalArticles(articles);
  return NextResponse.json(articles[index]);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  if (USE_SUPABASE) {
    const { error } = await supabase.from('articles').delete().eq('id', body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  const articles = await getLocalArticles();
  const filtered = articles.filter((a: { id: string }) => a.id !== body.id);
  await writeLocalArticles(filtered);
  return NextResponse.json({ success: true });
}
