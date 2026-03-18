'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Article } from '@/lib/articles';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

const CATEGORY_OPTIONS = [
  { value: 'interview', label: '人物專訪' },
  { value: 'books', label: '讀好書' },
  { value: 'applied-psychology', label: '應用心理學' },
  { value: 'organizational-psychology', label: '組織心理學' },
  { value: 'sherryshare', label: '選好物' },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.slug === 'new';

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    categories: [] as string[],
    tags: '',
    image: '',
    content: '',
    status: 'draft' as 'published' | 'draft',
    date: new Date().toISOString().split('T')[0],
  });
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isNew) {
      fetch('/api/articles')
        .then(res => res.json())
        .then((articles: Article[]) => {
          const article = articles.find(a => a.slug === params.slug);
          if (article) {
            setForm({
              title: article.title,
              slug: article.slug,
              excerpt: article.excerpt,
              categories: article.categories,
              tags: article.tags.join(', '),
              image: article.image,
              content: article.content,
              status: article.status,
              date: article.date,
            });
          }
        });
    }
  }, [isNew, params.slug]);

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: isNew ? slugify(title) : prev.slug,
    }));
  };

  const handleCategoryToggle = (cat: string) => {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) {
      setForm(prev => ({ ...prev, image: data.url }));
    }
  };

  const handleContentChange = useCallback((html: string) => {
    setForm(prev => ({ ...prev, content: html }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    if (imageFile) {
      await handleImageUpload(imageFile);
    }

    const articleData = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      id: isNew ? Date.now().toString() : undefined,
      author: 'Sherry',
    };

    await fetch('/api/articles', {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData),
    });

    setSaving(false);
    router.push('/admin');
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? '新增文章' : '編輯文章'}
          </h1>
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
            ← 返回列表
          </Link>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">文章標題</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2.5 text-lg focus:outline-none focus:border-[#DCA54A]"
              placeholder="輸入文章標題..."
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL路徑)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm font-mono focus:outline-none focus:border-[#DCA54A]"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">分類</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleCategoryToggle(cat.value)}
                  className={`px-4 py-1.5 text-sm rounded border transition ${
                    form.categories.includes(cat.value)
                      ? 'bg-[#DCA54A] text-black border-[#DCA54A]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-[#DCA54A]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">標籤 (逗號分隔)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#DCA54A]"
              placeholder="例：自戀, 心理學, 職場"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">封面圖片</label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#DCA54A]"
                placeholder="圖片 URL 或上傳..."
              />
              <label className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded cursor-pointer hover:bg-gray-200 transition">
                上傳
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      handleImageUpload(file);
                    }
                  }}
                />
              </label>
            </div>
            {form.image && (
              <img src={form.image} alt="Preview" className="mt-3 max-h-48 rounded" />
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#DCA54A] resize-none"
              placeholder="文章摘要..."
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">文章內容</label>
            <RichTextEditor content={form.content} onChange={handleContentChange} />
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">狀態</label>
              <select
                value={form.status}
                onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#DCA54A]"
              >
                <option value="draft">草稿</option>
                <option value="published">已發布</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#DCA54A]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#DCA54A] text-black font-medium px-8 py-2.5 rounded hover:bg-[#C4933E] transition disabled:opacity-50"
            >
              {saving ? '儲存中...' : '儲存文章'}
            </button>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
              取消
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
