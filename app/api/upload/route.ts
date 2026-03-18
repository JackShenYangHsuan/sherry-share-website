import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const USE_SUPABASE = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const timestamp = Date.now();
  const ext = file.name.split('.').pop() || 'png';
  const filename = `${timestamp}.${ext}`;

  if (USE_SUPABASE) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error } = await supabaseAdmin.storage
      .from('uploads')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage.from('uploads').getPublicUrl(filename);
    return NextResponse.json({ url: urlData.publicUrl });
  }

  // Local fallback
  const fs = await import('fs');
  const path = await import('path');
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filepath = path.join(uploadsDir, filename);
  fs.writeFileSync(filepath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
