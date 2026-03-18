import { NextRequest, NextResponse } from 'next/server';

const USE_VERCEL_PG = !!process.env.POSTGRES_URL;

async function getSupabaseClient() {
  const { supabase } = await import('@/lib/supabase');
  return supabase;
}

async function getVercelSql() {
  const { sql } = await import('@vercel/postgres');
  return sql;
}

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
  // Try @vercel/postgres first (works on Vercel with Supabase integration)
  if (USE_VERCEL_PG) {
    try {
      const sql = await getVercelSql();
      const result = await sql`SELECT * FROM articles ORDER BY date DESC`;
      return NextResponse.json(result.rows);
    } catch (e) {
      // Table might not exist yet, fall back to Supabase client
      console.error('Vercel PG error:', e);
    }
  }

  // Try Supabase JS client
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });
      if (!error && data) return NextResponse.json(data);
    } catch (e) {
      console.error('Supabase client error:', e);
    }
  }

  // Local JSON fallback
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

  if (USE_VERCEL_PG) {
    try {
      const sql = await getVercelSql();
      await sql`
        INSERT INTO articles (id, slug, title, excerpt, categories, tags, image, date, author, status, content)
        VALUES (${newArticle.id}, ${newArticle.slug}, ${newArticle.title}, ${newArticle.excerpt},
                ${newArticle.categories as unknown as string}, ${newArticle.tags as unknown as string},
                ${newArticle.image}, ${newArticle.date}, ${newArticle.author}, ${newArticle.status}, ${newArticle.content})
      `;
      return NextResponse.json(newArticle, { status: 201 });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await getSupabaseClient();
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

  if (USE_VERCEL_PG) {
    try {
      const sql = await getVercelSql();
      await sql`
        UPDATE articles SET
          title = ${body.title},
          excerpt = ${body.excerpt || ''},
          categories = ${body.categories as unknown as string || '{}'},
          tags = ${body.tags as unknown as string || '{}'},
          image = ${body.image || ''},
          date = ${body.date},
          author = ${body.author || 'Sherry'},
          status = ${body.status || 'draft'},
          content = ${body.content || ''},
          updated_at = NOW()
        WHERE slug = ${body.slug}
      `;
      return NextResponse.json(body);
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await getSupabaseClient();
    const updateData = { ...body, updated_at: new Date().toISOString() };
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
  articles[index] = { ...articles[index], ...body };
  await writeLocalArticles(articles);
  return NextResponse.json(articles[index]);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  if (USE_VERCEL_PG) {
    try {
      const sql = await getVercelSql();
      await sql`DELETE FROM articles WHERE id = ${body.id}`;
      return NextResponse.json({ success: true });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.from('articles').delete().eq('id', body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  const articles = await getLocalArticles();
  const filtered = articles.filter((a: { id: string }) => a.id !== body.id);
  await writeLocalArticles(filtered);
  return NextResponse.json({ success: true });
}
