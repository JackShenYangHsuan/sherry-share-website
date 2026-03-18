'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOMEPAGE_CATEGORY_CARDS } from '@/lib/constants';

export default function CategoryCards() {
  return (
    <section className="bg-black pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HOMEPAGE_CATEGORY_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <Link
                href={card.href}
                className="relative group overflow-hidden rounded-lg aspect-[3/4] block"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6 transition-transform duration-300 group-hover:translate-y-[-4px]">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">{card.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm">{card.subtitle}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
