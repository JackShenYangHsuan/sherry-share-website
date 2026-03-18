'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="bg-black text-white py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-[#DCA54A]"
          style={{ fontFamily: "'Architects Daughter', cursive" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          40+ CARE
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          這是一個用心嘗試新事物、體驗美好、並且誠實分享給你的地方。
        </motion.p>
        <motion.p
          className="text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          我們可以一起，每一天，做一點點微小但重要的選擇，讓生活開花，讓心情安定，讓自己溫柔地與世界連結。
        </motion.p>
      </div>
    </section>
  );
}
