'use client';

import { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import {
  FaBold, FaItalic, FaHeading, FaListUl, FaListOl,
  FaQuoteLeft, FaImage, FaYoutube, FaLink, FaMinus, FaUndo, FaRedo, FaUpload,
} from 'react-icons/fa';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      TiptapImage,
      Youtube.configure({ width: 640, height: 360 }),
      Placeholder.configure({ placeholder: '開始撰寫文章內容...' }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
      e.target.value = '';
    }
  };

  const addImageFromUrl = () => {
    const url = prompt('輸入圖片 URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYoutube = () => {
    const url = prompt('輸入 YouTube 影片 URL:');
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt('輸入連結 URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const ToolbarButton = ({ onClick, active, children, title }: {
    onClick: () => void; active?: boolean; children: React.ReactNode; title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 transition ${active ? 'bg-gray-200 text-[#DCA54A]' : 'text-gray-600'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="tiptap-editor border border-gray-300 rounded-lg overflow-hidden">
      {/* Hidden file input for local image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="粗體"
        >
          <FaBold size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="斜體"
        >
          <FaItalic size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="標題 H2"
        >
          <FaHeading size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="標題 H3"
        >
          <span className="text-xs font-bold">H3</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="無序列表"
        >
          <FaListUl size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="有序列表"
        >
          <FaListOl size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="引用"
        >
          <FaQuoteLeft size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={addLink} title="連結">
          <FaLink size={14} />
        </ToolbarButton>
        <div className="border-l border-gray-300 mx-1" />
        <ToolbarButton onClick={() => fileInputRef.current?.click()} title="上傳本地圖片">
          <FaUpload size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={addImageFromUrl} title="插入圖片網址">
          <FaImage size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={addYoutube} title="插入 YouTube">
          <FaYoutube size={14} />
        </ToolbarButton>
        <div className="border-l border-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="分隔線"
        >
          <FaMinus size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="復原">
          <FaUndo size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="重做">
          <FaRedo size={14} />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[400px]" />
    </div>
  );
}
