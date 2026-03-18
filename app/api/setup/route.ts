import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import pg from 'pg';

const SEED_ARTICLES = [
  {
    id: "1", slug: "father-daughter-relationship",
    title: "影響一生的父女關係：你是「父親的乖女兒」嗎？心理治療師Dr. Maureen Murdock《父親的乖女兒》",
    excerpt: "心理治療師Dr. Maureen Murdock探討父女關係中的隱藏動力，以及它如何影響女性的一生。",
    categories: ["books", "interview"], tags: ["父女關係", "家庭", "自我覺察"],
    image: "/images/article-murdock.webp", date: "2025-11-15", author: "Sherry", status: "published",
    content: `<p>在流行文化中，當女性在處理與男性的關係時遭遇困難，我們經常會聽到一句不經意的話：「她有父親情結（daddy issues）」。</p><hr/><h2>「父親的乖女兒」：一種特殊的互動模式</h2><p>莫琳．默多克博士（Dr. Maureen Murdock）是一位心理治療師、教育家。</p><hr/><h2>關係的關鍵創傷</h2><p>「父親的乖女兒」關係中的一個關鍵是排斥母親。</p><hr/><h2>不健康的父女關係原型</h2><p>默多克博士在書中描述了幾種不健康的父女關係原型。</p><hr/><h2>療癒之路</h2><ul><li>承認並接受自己的感受</li><li>尋求專業心理諮詢</li><li>發展獨立的自我認同</li></ul>`
  },
  {
    id: "2", slug: "narcissistic-personality",
    title: "自戀型人格的真實面貌：採訪全球頂尖心理專家Dr. Ramani Durvasula《毒性關係．斷捨離》",
    excerpt: "自戀型人格不只是自我中心，而是一種難以改變的人格風格。",
    categories: ["books", "interview"], tags: ["自戀", "自戀型人格", "自我覺察"],
    image: "/images/article-ramani.webp", date: "2025-11-10", author: "Sherry", status: "published",
    content: `<p>自戀型人格不只是自我中心，而是一種難以改變的人格風格。</p><hr/><h2>什麼是自戀型人格？</h2><p>自戀型人格障礙（NPD）是一種複雜的心理狀態。</p><hr/><h2>辨識毒性關係的關鍵信號</h2><ul><li><strong>煤氣燈效應</strong></li><li><strong>愛情轟炸</strong></li><li><strong>冷暴力</strong></li></ul><hr/><h2>如何保護自己</h2><ol><li>認識並接受現實</li><li>設定健康的界線</li><li>建立支持系統</li></ol>`
  },
  {
    id: "3", slug: "brain-fatigue",
    title: "告別超時工作，重拾內在平靜：專訪頂尖腦科醫師Dr. Romie Mushtaq《大腦不疲勞》",
    excerpt: "現代人習慣以忙碌為榮，但「大腦疲勞」正悄悄消耗你的專注力與幸福感。",
    categories: ["sherryshare", "interview"], tags: ["腦神經科學", "腦科學", "職場"],
    image: "/images/article-romie.webp", date: "2025-10-20", author: "Sherry", status: "published",
    content: `<p>現代人習慣以忙碌為榮，但「大腦疲勞」正悄悄消耗你的專注力與幸福感。</p><hr/><h2>什麼是大腦疲勞？</h2><ul><li><strong>睡眠障礙</strong></li><li><strong>注意力分散</strong></li><li><strong>情緒失調</strong></li></ul><hr/><h2>重設大腦的八週計畫</h2><h3>第一步：修復睡眠</h3><p>建立規律的睡眠時間表。</p><h3>第二步：管理數位刺激</h3><p>設定每日的「數位斷捨離」時間。</p>`
  },
  {
    id: "4", slug: "liu-ruo-ying",
    title: "底氣是用意外造就的：劉若英的不犧牲、不討好人生哲學",
    excerpt: "劉若英在深度訪談中展現了一位成熟女性的智慧與力量。",
    categories: ["interview"], tags: ["劉若英", "勇氣", "自我覺察"],
    image: "/images/article-liuruoying.webp", date: "2025-11-05", author: "Sherry", status: "published",
    content: `<p>劉若英，一個在華語世界家喻戶曉的名字。</p><hr/><h2>底氣不是天生的</h2><p>底氣是用一次次的意外造就的。</p><hr/><h2>不犧牲的哲學</h2><p>每一個選擇都是主動做出的。</p><hr/><h2>給40+女性的建議</h2><ul><li>接受自己的不完美</li><li>勇於嘗試新事物</li><li>保持對生活的好奇心</li></ul>`
  },
  {
    id: "5", slug: "repression-and-flow",
    title: "壓抑與流動：你變了，那你還是你嗎？",
    excerpt: "探討個人成長過程中的身份認同變化，以及如何在改變中保持自我。",
    categories: ["applied-psychology"], tags: ["個體化", "自我覺察"],
    image: "/images/article-change.jpg", date: "2025-09-15", author: "Sherry", status: "published",
    content: `<p>「你變了。」這句話，你聽過幾次？</p><hr/><h2>壓抑：被凍結的自我</h2><p>壓抑是一種自我保護機制。</p><hr/><h2>流動：允許自己成為</h2><p>流動意味著允許自己的情感隨著生命經驗而自然演變。</p><hr/><h2>個體化的旅程</h2><p>榮格將這個過程稱為「個體化」。</p>`
  }
];

export async function GET() {
  const results: string[] = [];
  let client: pg.Client | null = null;

  try {
    // Connect using POSTGRES_URL_NON_POOLING for DDL operations
    const connStr = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
    if (!connStr) {
      return NextResponse.json({ success: false, error: 'No POSTGRES_URL env var found' }, { status: 500 });
    }

    // Strip sslmode from URL and handle SSL manually
    const cleanUrl = connStr.replace(/[?&]sslmode=[^&]*/g, '').replace(/[?&]supa=[^&]*/g, '');
    results.push(`Connecting to Postgres...`);
    client = new pg.Client({
      connectionString: cleanUrl,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    results.push('✅ Connected');

    // Step 1: Create articles table
    results.push('Creating articles table...');
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
        status TEXT DEFAULT 'draft',
        content TEXT DEFAULT '',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    results.push('✅ articles table created');

    // Step 2: Enable RLS
    await client.query(`ALTER TABLE articles ENABLE ROW LEVEL SECURITY;`);
    results.push('✅ RLS enabled');

    // Step 3: Create RLS policy
    try {
      await client.query(`CREATE POLICY "Allow all" ON articles FOR ALL USING (true) WITH CHECK (true);`);
      results.push('✅ RLS policy created');
    } catch {
      results.push('⚠️ RLS policy already exists');
    }

    // Step 4: Seed articles
    results.push('Seeding articles...');
    for (const a of SEED_ARTICLES) {
      try {
        await client.query(`
          INSERT INTO articles (id, slug, title, excerpt, categories, tags, image, date, author, status, content)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title, excerpt = EXCLUDED.excerpt,
            categories = EXCLUDED.categories, tags = EXCLUDED.tags,
            image = EXCLUDED.image, date = EXCLUDED.date,
            content = EXCLUDED.content, updated_at = NOW()
          RETURNING slug;
        `, [a.id, a.slug, a.title, a.excerpt, a.categories, a.tags, a.image, a.date, a.author, a.status, a.content]);
        results.push(`  ✅ ${a.slug}`);
      } catch (e) {
        results.push(`  ❌ ${a.slug}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }

    // Step 5: Create storage bucket
    results.push('Creating storage bucket...');
    if (supabaseAdmin) {
      const { error: bucketError } = await supabaseAdmin.storage.createBucket('uploads', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'],
        fileSizeLimit: 52428800,
      });
      if (bucketError && !bucketError.message.includes('already exists')) {
        results.push(`  ⚠️ ${bucketError.message}`);
      } else {
        results.push('  ✅ uploads bucket created');
      }
    }

    // Step 6: Verify
    const count = await client.query('SELECT count(*) FROM articles');
    results.push(`\nTotal articles: ${count.rows[0].count}`);
    results.push('\n🎉 Setup complete!');

    await client.end();
    return NextResponse.json({ success: true, log: results });
  } catch (error) {
    if (client) try { await client.end(); } catch { /* ignore */ }
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      log: results
    }, { status: 500 });
  }
}
