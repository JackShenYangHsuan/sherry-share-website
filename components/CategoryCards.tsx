import Link from 'next/link';
import Image from 'next/image';
import { HOMEPAGE_CATEGORY_CARDS } from '@/lib/constants';

export default function CategoryCards() {
  return (
    <section className="bg-black pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HOMEPAGE_CATEGORY_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="relative group overflow-hidden rounded-lg aspect-[3/4]"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-6">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-1">{card.title}</h3>
                <p className="text-gray-300 text-xs md:text-sm">{card.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
