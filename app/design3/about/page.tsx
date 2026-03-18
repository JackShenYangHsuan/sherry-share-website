'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const TEAL = '#1B4B5A';
const SAND = '#E8DDD0';
const DARK = '#1a1a1a';

function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const timelineEvents = [
  {
    year: '13歲',
    title: '移民澳洲',
    description: '離開台灣，開始了在異國的成長旅程，學習獨立與適應新文化。',
  },
  {
    year: '大學',
    title: '哥倫比亞大學',
    description: '在紐約完成心理學與社會學雙學士學位，奠定了專業基礎。',
  },
  {
    year: '七年',
    title: '美國國際職場經驗',
    description: '在美國累積豐富的國際組織經驗，深入理解跨文化溝通與領導力。',
  },
  {
    year: '歸來',
    title: '返台定居',
    description: '帶著國際視野回到台灣，開啟人生新篇章。',
  },
  {
    year: '2020',
    title: '創立百彥國際發展顧問',
    description: '結合組織心理學專業與國際經驗，幫助企業與個人實現成長。',
  },
  {
    year: '著作',
    title: 'MBTI系列書籍',
    description: '將心理學知識轉化為實用工具，幫助讀者更好地認識自己。',
  },
];

const certifications = [
  'MBTI Step I & II 認證施測師',
  'Hogan Assessment 認證',
  'ICF 認證教練',
  '組織發展顧問',
  '企業培訓講師',
  '職涯諮詢師',
];

export default function Design3AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ========== HERO ========== */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <h1
                className="text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
              >
                我的故事
              </h1>
              <div
                className="space-y-5 text-base md:text-lg leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#555' }}
              >
                <p>
                  我是雪力，一個在三個國家生活過的組織心理學家。十三歲離開台灣移民澳洲，大學到紐約的哥倫比亞大學，在美國工作了七年後，最終選擇回到台灣。
                </p>
                <p>
                  這段跨越文化的旅程，讓我深深相信：真正的成長來自於不斷地重新認識自己。每一次的環境轉換，都是一面鏡子，映照出我們從未察覺的自己。
                </p>
                <p>
                  現在，我想透過文字和對話，分享這些年來在心理學、自我成長和生活美學上的體悟。希望每一篇內容，都能成為你生活中的一點啟發。
                </p>
              </div>
            </motion.div>

            {/* Right: Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/sherry-portrait.webp"
                  alt="Sherry 雪力"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative elements */}
              <div
                className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl -z-10"
                style={{ backgroundColor: SAND, opacity: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section style={{ backgroundColor: '#fafafa' }} className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2
                className="text-3xl md:text-4xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
              >
                人生里程碑
              </h2>
              <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: TEAL }} />
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{ backgroundColor: '#ddd' }}
            />

            {timelineEvents.map((event, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className={`relative flex items-start mb-12 last:mb-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10 shadow-sm"
                    style={{ backgroundColor: TEAL }}
                  />

                  {/* Content */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
                    }`}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        backgroundColor: TEAL,
                        color: '#fff',
                      }}
                    >
                      {event.year}
                    </span>
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                    >
                      {event.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CERTIFICATIONS ========== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2
                className="text-3xl md:text-4xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
              >
                專業認證
              </h2>
              <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: TEAL }} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  className="p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: TEAL }}
                >
                  <p
                    className="text-sm font-medium text-white"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {cert}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SPEAKING CTA ========== */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-speaking.jpg"
            alt="Sherry speaking"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-white mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              邀請我演講
            </h2>
            <p
              className="text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              無論是企業內訓、公開演講或工作坊，我都能為你的團隊帶來心理學的專業洞見與實用工具。
            </p>
            <Link
              href="/design3/contact"
              className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                backgroundColor: TEAL,
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              聯繫我
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== VALUES SECTION ========== */}
      <section style={{ backgroundColor: SAND }} className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2
                className="text-3xl md:text-4xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif", color: DARK }}
              >
                我相信的事
              </h2>
              <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: TEAL }} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '深度勝過廣度',
                text: '與其追求面面俱到，不如在每一件事上投入真正的專注與理解。',
              },
              {
                title: '改變始於覺察',
                text: '當我們開始注意到自己的思維模式，改變就已經開始了。',
              },
              {
                title: '分享就是力量',
                text: '每一次真誠的分享，都可能成為某個人生命中的轉折點。',
              },
            ].map((value, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <h3
                    className="text-xl mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif", color: TEAL }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}
                  >
                    {value.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
