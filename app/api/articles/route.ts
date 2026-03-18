import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';

function getPool() {
  const connStr = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  if (!connStr) return null;
  return new pg.Pool({ connectionString: connStr, ssl: { rejectUnauthorized: false }, max: 5 });
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
  const pool = getPool();
  if (pool) {
    try {
      const result = await pool.query('SELECT * FROM articles ORDER BY date DESC');
      await pool.end();
      return NextResponse.json(result.rows);
    } catch (e) {
      console.error('PG error, falling back to local:', e);
      try { await pool.end(); } catch { /* ignore */ }
    }
  }

  // Local JSON fallback (works during build + local dev)
  const articles = await getLocalArticles();
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const a = {
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

  const pool = getPool();
  if (pool) {
    try {
      await pool.query(`
        INSERT INTO articles (id, slug, title, excerpt, categories, tags, image, date, author, status, content)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [a.id, a.slug, a.title, a.excerpt, a.categories, a.tags, a.image, a.date, a.author, a.status, a.content]);
      await pool.end();
      return NextResponse.json(a, { status: 201 });
    } catch (e) {
      try { await pool.end(); } catch { /* ignore */ }
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  const articles = await getLocalArticles();
  articles.push(a);
  await writeLocalArticles(articles);
  return NextResponse.json(a, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const pool = getPool();
  if (pool) {
    try {
      await pool.query(`
        UPDATE articles SET title=$1, excerpt=$2, categories=$3, tags=$4, image=$5, date=$6, author=$7, status=$8, content=$9, updated_at=NOW()
        WHERE slug=$10
      `, [body.title, body.excerpt||'', body.categories||[], body.tags||[], body.image||'', body.date, body.author||'Sherry', body.status||'draft', body.content||'', body.slug]);
      await pool.end();
      return NextResponse.json(body);
    } catch (e) {
      try { await pool.end(); } catch { /* ignore */ }
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  const articles = await getLocalArticles();
  const index = articles.findIndex((a: { slug: string }) => a.slug === body.slug);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  articles[index] = { ...articles[index], ...body };
  await writeLocalArticles(articles);
  return NextResponse.json(articles[index]);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const pool = getPool();
  if (pool) {
    try {
      await pool.query('DELETE FROM articles WHERE id = $1', [body.id]);
      await pool.end();
      return NextResponse.json({ success: true });
    } catch (e) {
      try { await pool.end(); } catch { /* ignore */ }
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  const articles = await getLocalArticles();
  const filtered = articles.filter((a: { id: string }) => a.id !== body.id);
  await writeLocalArticles(filtered);
  return NextResponse.json({ success: true });
}
