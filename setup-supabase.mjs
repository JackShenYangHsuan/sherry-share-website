import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgres://postgres.videsmzkutzfomlducva:2MdKm0QcWT5Yo2Q9@aws-1-us-east-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function setup() {
  console.log('Connecting via pooler...');
  await client.connect();
  console.log('Connected!');

  // 1. Create articles table
  console.log('\n--- Creating articles table ---');
  await client.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT DEFAULT '',
      categories TEXT[] DEFAULT '{}',
      tags TEXT[] DEFAULT '{}',
      image TEXT DEFAULT '',
      date DATE DEFAULT CURRENT_DATE,
      author TEXT DEFAULT 'Sherry',
      status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
      content TEXT DEFAULT '',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log('articles table created');

  // 2. Enable RLS with open policy
  console.log('\n--- Setting up RLS ---');
  await client.query(`ALTER TABLE articles ENABLE ROW LEVEL SECURITY;`);
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'articles' AND policyname = 'Allow all') THEN
        CREATE POLICY "Allow all" ON articles FOR ALL USING (true) WITH CHECK (true);
      END IF;
    END $$;
  `);
  console.log('RLS enabled');

  // 3. Create storage bucket
  console.log('\n--- Creating storage bucket ---');
  await client.query(`
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('uploads', 'uploads', true)
    ON CONFLICT (id) DO NOTHING;
  `);
  console.log('uploads bucket created');

  // 4. Storage policies
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public read uploads') THEN
        CREATE POLICY "Public read uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
      END IF;
    END $$;
  `);
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow uploads') THEN
        CREATE POLICY "Allow uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads');
      END IF;
    END $$;
  `);
  console.log('Storage policies set');

  // 5. Seed articles
  console.log('\n--- Seeding articles ---');
  const { readFileSync } = await import('fs');
  const articles = JSON.parse(readFileSync('./data/articles.json', 'utf-8'));
  
  for (const a of articles) {
    const res = await client.query(`
      INSERT INTO articles (id, slug, title, excerpt, categories, tags, image, date, author, status, content)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title, excerpt = EXCLUDED.excerpt,
        categories = EXCLUDED.categories, tags = EXCLUDED.tags,
        image = EXCLUDED.image, date = EXCLUDED.date,
        content = EXCLUDED.content, updated_at = NOW()
      RETURNING slug;
    `, [a.id, a.slug, a.title, a.excerpt, a.categories, a.tags, a.image, a.date, a.author, a.status, a.content]);
    console.log('  Seeded:', res.rows[0].slug);
  }

  const count = await client.query('SELECT count(*) FROM articles');
  console.log('\nTotal articles:', count.rows[0].count);

  await client.end();
  console.log('\n✅ Supabase setup complete!');
}

setup().catch(e => { console.error(e); process.exit(1); });
