'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaYoutube, FaInstagram, FaFacebook, FaPodcast } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Design2AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const credentials = [
    { title: '主要身份與經歷', items: [
      '百彥國際發展顧問有限公司 Baiyan Global Consulting 創辦人/ CEO',
      '台灣女董事協會 (WOB) 第三屆理事',
      '台灣女董事協會 女董學院 (WOB Academy) - 第二屆女性菁英領導人培訓專案 企業導師',
      '自媒體《Sherry\'s Notes 雪力的心理學筆記》YouTube頻道主持人',
      'VOGUE TAIWAN 網路專欄作家',
      '作家，著有《MBTI 我，和我的使用說明書》(2023)、《內在自癒：設計我想要的人生》(2024)、《MBTI 我，和我的愛情說明書》(2025) 等書',
    ]},
    { title: '學歷及專業領域', items: [
      '哥倫比亞大學教師學院 高階管理人 組織心理學碩士',
      '哥倫比亞大學 Barnard 學院 心理學 & 社會學雙學士',
    ]},
    { title: '國際認證執照', items: [
      'MBTI 施測師及講師認證 (Myers-Briggs Certified)',
      'HOGAN霍根測評施測師認證 (Hogan Advance Interpretation Certification)',
      'IDI跨文化敏感度施測師認證 (Intercultural Development Inventory Certification)',
      '職場多元共融實踐師認證 (Diversity, Equity and Inclusion in the Workplace Certificate)',
    ]},
  ];

  const socialLinks = [
    { icon: <FaYoutube size={18} />, href: 'https://pse.is/SherrysNotesYT', label: 'YouTube' },
    { icon: <FaInstagram size={18} />, href: 'https://pse.is/SherrysNotesIG', label: 'Instagram' },
    { icon: <FaFacebook size={18} />, href: 'https://pse.is/SherrysNotesFB', label: 'Facebook' },
    { icon: <FaPodcast size={18} />, href: 'https://pse.is/SherrysNotesPodcast', label: 'Podcast' },
    { icon: <FaThreads size={18} />, href: 'https://pse.is/SherrysNotesThreads', label: 'Threads' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative min-h-[80vh] overflow-hidden flex items-center">
        {/* Background image */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <img
            src="/images/about-speaking.jpg"
            alt="Sherry speaking"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              {/* FOUNDER in gold outlined text */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.1em] mb-8"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  WebkitTextStroke: '2px #D4AF37',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                FOUNDER
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="h-[2px] w-12 bg-[#D4AF37] mb-6" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  夏瑄澧 Sherry Hsia
                </h2>
                <p className="text-gray-400 text-lg mb-6">
                  組織心理學家 &middot; 企業組織顧問 &middot; 高階人才教練 &middot; 作家
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <a
                  href="#credentials"
                  className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  完整學經歷
                </a>
                <Link
                  href="/design2/contact"
                  className="border border-white/20 text-gray-400 px-6 py-3 text-sm tracking-wider hover:border-white hover:text-white transition-all duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  合作與演講邀約
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3"
              >
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right: Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block relative"
            >
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#D4AF37]/20" />
              <img
                src="/images/hero-portrait.png"
                alt="Sherry Hsia"
                className="relative w-full aspect-[3/4] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="py-24 bg-[#0E0E0E]">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37] tracking-[0.3em] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Story
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                夏瑄澧（AKA 雪力）出生於台灣，13 歲時移民澳洲，曾在台灣就讀高中兩年，隨後前往美國哥倫比亞大學巴納德學院（Barnard College of Columbia University）就讀。畢業後於美國累積七年國際職場經驗，最終選擇返台定居。
              </p>
              <p>
                從小經歷東西文化的碰撞，引發自身對於不同文化深入了解的動機，也從中找到及奠定了自己的職業使命——協助企業建立多元共融文化，培養跨文化素養（Intercultural Competency），讓個人與組織在全球化環境中茁壯成長。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Large Quote ── */}
      <section className="py-24 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="relative">
              {/* Large decorative quote mark */}
              <span className="absolute -top-8 -left-4 text-[120px] leading-none text-[#D4AF37]/10 font-serif select-none">&ldquo;</span>
              <blockquote className="relative z-10">
                <p className="text-2xl md:text-3xl lg:text-4xl text-[#D4AF37] font-light leading-relaxed italic">
                  我一直以來都以自己的努力為傲，但在職涯發展到高階主管的階段，我發現不管工作性質，總會遇到類似的瓶頸。直到學習組織心理學後，我才意識到，光靠努力是不夠的。
                </p>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── About Detail ── */}
      <section className="py-24 bg-[#0E0E0E]">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              關於雪力｜跨文化領域專家、企業講師、作家
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                唯有深入了解自己與組織運作的核心動能，才能真正突破職涯與企業發展的限制。
              </p>
              <p>
                如今，雪力將自身的經驗與專業知識結合，透過企業培訓、專題演講及書籍分享，幫助個人與組織找到突破現狀的關鍵，實現更深層次的成長與轉變。
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 border-l-2 border-[#D4AF37] pl-6">
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Baiyan Global Consulting 百彥國際發展顧問
              </h3>
              <p className="text-gray-400 leading-relaxed">
                2020 年，雪力創立 Baiyan Global Consulting 百彥國際發展顧問有限公司，融合東西方學術研究與文化智慧，並以心理學與社會學為基礎，致力於協助企業與組織提升跨文化管理能力，推動多元共融（DEI）文化。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Speaking Photo Full-width ── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="/images/about-building.jpg"
          alt="Speaking engagement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeIn>
            <div className="text-center px-6">
              <h2
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                企業培訓 &middot; 演講 &middot; 教練
              </h2>
              <Link
                href="/design2/contact"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-4 text-sm font-semibold tracking-wider hover:bg-[#E5C04B] transition-all duration-300"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                聯繫我們
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section id="credentials" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37] tracking-[0.3em] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Credentials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              完整學經歷
            </h2>
          </FadeIn>

          <div className="space-y-12">
            {credentials.map((section, si) => (
              <FadeIn key={section.title} delay={si * 0.1}>
                <div>
                  <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-400">
                        <span className="text-[#D4AF37] mt-1.5 flex-shrink-0">&#9670;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-24 bg-[#0E0E0E] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wider"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                WebkitTextStroke: '1px #D4AF37',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CONTACT
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              合作或演講邀約，歡迎透過聯絡表單留下相關資訊，我們會盡速與您聯繫。
            </p>
            <Link
              href="/design2/contact"
              className="inline-flex items-center gap-3 border border-[#D4AF37] text-[#D4AF37] px-10 py-4 text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              合作與演講邀約
              <span>&rarr;</span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
