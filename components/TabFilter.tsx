'use client';

import { CATEGORIES } from '@/lib/constants';

interface TabFilterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabFilter({ activeTab, onTabChange }: TabFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onTabChange(cat.slug)}
          className={`px-5 py-2.5 text-sm font-medium rounded transition ${
            activeTab === cat.slug
              ? 'bg-[#DCA54A] text-black'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
