'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const credentials = [
  '美國哥倫比亞大學組織心理學碩士',
  '紐約大學心理學學士',
  '超過十五年跨國企業人力資源與組織發展經驗',
  '認證專業教練 (ICF ACC)',
  'Podcast「雪力的心理學筆記」主持人',
  '暢銷書作者',
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      {/* ============ HERO ============ */}
      <section className="pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span
              className="text-xs md:text-sm tracking-[0.5em] uppercase"
              style={{ color: '#B8B0A4', fontFamily: "'Montserrat', sans-serif", fontWeight: 300, letterSpacing: '0.5em' }}
            >
              Founder
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl mt-4 mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
            >
              夏瑄澧
            </h1>
            <p
              className="text-xl md:text-2xl"
              style={{ fontFamily: "'Playfair Display', serif", color: '#8A8075', fontStyle: 'italic', fontWeight: 400 }}
            >
              Sherry Hsia
            </p>

            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-12" style={{ backgroundColor: '#C4A265' }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#C4A265' }} />
              <div className="h-px w-12" style={{ backgroundColor: '#C4A265' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SPLIT INTRO ============ */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div
                  className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 w-full h-full rounded-sm"
                  style={{ border: '1px solid #C4A265' }}
                />
                <Image
                  src="/images/about-speaking.jpg"
                  alt="Sherry speaking"
                  width={500}
                  height={600}
                  className="relative z-10 w-full h-auto object-cover rounded-sm"
                />
              </div>
            </motion.div>

            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="h-px w-12 mb-8" style={{ backgroundColor: '#C4A265' }} />
              <p
                className="text-lg md:text-xl leading-relaxed mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#3D3830', fontWeight: 400 }}
              >
                我是夏瑄澧，大家叫我 Sherry。一個在美國生活了超過二十年的台灣人。
              </p>
              <p className="text-sm leading-loose mb-6" style={{ color: '#6B6358' }}>
                我擁有哥倫比亞大學組織心理學碩士學位，在紐約的跨國企業工作了超過十五年。在人力資源與組織發展的領域中，我見證了無數人的職涯轉折與人生抉擇。
              </p>
              <p className="text-sm leading-loose mb-6" style={{ color: '#6B6358' }}>
                過了四十歲以後，我發現自己的價值觀悄悄改變了。不再追求更多、更快，而是開始思考什麼才是真正重要的。這個轉變讓我決定創立 SherryShare，把那些讓我感動的事物帶給你。
              </p>
              <p className="text-sm leading-loose" style={{ color: '#6B6358' }}>
                在這裡，我分享心理學的智慧、深度的人物訪談、值得一讀的好書，以及那些讓日常生活更美好的小事。我相信，用心生活是一種藝術，而這個藝術值得被分享。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ STORY SECTION ============ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
            >
              The Story
            </span>
            <h2
              className="text-3xl md:text-5xl mt-3"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
            >
              故事
            </h2>
          </motion.div>

          <motion.div {...fadeInUp}>
            {/* Pull quote */}
            <blockquote className="mb-12 pl-8" style={{ borderLeft: '3px solid #C4A265' }}>
              <p
                className="text-xl md:text-2xl leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif", color: '#3D3830', fontStyle: 'italic', fontWeight: 400 }}
              >
                &ldquo;我想做的不是告訴你答案，而是陪你一起探索那些重要的問題。&rdquo;
              </p>
            </blockquote>

            <div className="space-y-6">
              <p className="text-sm leading-loose" style={{ color: '#6B6358' }}>
                SherryShare 的誕生源自一個簡單的想法：在資訊爆炸的時代，我們更需要的是有深度、有溫度的內容。不是流量導向的標題黨，不是千篇一律的效率工具推薦，而是真正能觸動人心、帶來啟發的分享。
              </p>
              <p className="text-sm leading-loose" style={{ color: '#6B6358' }}>
                在這個平台上，我透過心理學的視角，探索人與人之間的關係、職場中的成長、以及生活中的美好。每一篇文章、每一次訪談，都是我用心思考與體驗後的真誠記錄。
              </p>
              <p className="text-sm leading-loose" style={{ color: '#6B6358' }}>
                我相信每個人都值得過上更有意識、更有品質的生活。而心理學，正是幫助我們理解自己、連結他人的最好工具。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ CREDENTIALS ============ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#C4A265', fontFamily: "'Montserrat', sans-serif" }}
            >
              Background
            </span>
            <h2
              className="text-3xl md:text-4xl mt-3"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
            >
              專業背景
            </h2>
          </motion.div>

          <motion.div {...fadeInUp}>
            <div className="max-w-xl mx-auto">
              {credentials.map((cred, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 py-4"
                  style={{ borderBottom: '1px solid #E8E2D8' }}
                >
                  <div className="w-1.5 h-1.5 rotate-45 mt-1.5 flex-shrink-0" style={{ backgroundColor: '#C4A265' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#5A5347' }}>
                    {cred}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ PHOTO GRID ============ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-2 md:col-span-1 md:row-span-2"
            >
              <div className="relative h-64 md:h-full overflow-hidden rounded-sm">
                <Image
                  src="/images/sherry-portrait.webp"
                  alt="Sherry portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/images/about-building.jpg"
                  alt="Building"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/images/sherry-studio.webp"
                  alt="Sherry studio"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="col-span-2"
            >
              <div className="relative aspect-[2/1] overflow-hidden rounded-sm">
                <Image
                  src="/images/about-cover.png"
                  alt="About cover"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAF7F2' }}>
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12" style={{ backgroundColor: '#C4A265' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#C4A265' }} />
            <div className="h-px w-12" style={{ backgroundColor: '#C4A265' }} />
          </div>

          <h2
            className="text-2xl md:text-4xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2C2824', fontWeight: 400 }}
          >
            合作與演講邀約
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: '#6B6358' }}>
            如果您對合作、演講邀約、企業培訓或媒體採訪有興趣，歡迎與我聯繫。
          </p>
          <Link
            href="/design1/contact"
            className="inline-block px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
            style={{
              backgroundColor: '#C4A265',
              color: '#FAF7F2',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A68840')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C4A265')}
          >
            聯繫我
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
