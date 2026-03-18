'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-snug">
                一個讓你更靠近自己的地方
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-4 text-[#4A4A4A] leading-relaxed">
                <p>過了四十歲以後，我發現自己的價值觀悄悄改變了。</p>
                <p>量不再重要，質才是關鍵。我開始懂得將資源花在真正讓自己感到快樂、被善待的事物上，提醒自己：這是我努力得來的，我值得擁有。</p>
                <p>心理學告訴我們：當我們分享知識、與人連結時，大腦會釋放催產素（Oxytocin），讓我們感受到溫暖與信任。在這個無法掌控外部環境的世界裡，能夠好好選擇、善待自己，本身就是一種力量。</p>
                <p>歡迎你，和我一起走進這段細緻而有力量的生活旅程。</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/blog"
                  className="bg-[#DCA54A] text-black font-medium px-8 py-3 rounded hover:bg-[#C4933E] hover:shadow-lg transition-all duration-300 text-sm"
                >
                  閱讀文章
                </Link>
                <Link
                  href="/category/sherryshare"
                  className="border-2 border-gray-900 text-gray-900 font-medium px-8 py-3 rounded hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm"
                >
                  雪力選物
                </Link>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right" delay={0.15}>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <Image
                  src="/images/sherry-portrait.webp"
                  alt="Sherry 雪力"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
